from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import PromptTemplate
from rag.embeddings import get_vectorstore
from dotenv import load_dotenv
import os

load_dotenv()

SYSTEM_PROMPT = """You are FarmBridge AI, an expert agricultural assistant 
for farmers in Karnataka, India. You have deep knowledge of:
- Karnataka crop calendars and farming seasons
- Pest and disease identification and treatment
- Government schemes and eligibility (PM-Kisan, PMFBY, Raitha Siri, etc.)
- Soil health and fertilizer recommendations
- Water management and irrigation

IMPORTANT RULES:
1. Always answer in the SAME language the farmer asks in
   - If asked in Kannada → reply in Kannada
   - If asked in Hindi → reply in Hindi  
   - If asked in English → reply in English
2. Keep answers practical and simple — farmers need actionable advice
3. Always mention safety warnings when recommending pesticides
4. If unsure, say so honestly — never give wrong agricultural advice
5. End every answer with one follow-up tip the farmer can act on today

Context from knowledge base:
{context}

Chat history:
{chat_history}

Farmer's question: {question}

Your answer:"""

_qa_chain = None

def get_qa_chain():
    global _qa_chain
    if _qa_chain is not None:
        return _qa_chain

    vectorstore = get_vectorstore()
    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 4}
    )

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.getenv("GEMINI_API_KEY"),
        temperature=0.3,
        convert_system_message_to_human=True
    )

    memory = ConversationBufferWindowMemory(
        memory_key="chat_history",
        return_messages=True,
        output_key="answer",
        k=5
    )

    prompt = PromptTemplate(
        input_variables=["context", "chat_history", "question"],
        template=SYSTEM_PROMPT
    )

    _qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        combine_docs_chain_kwargs={"prompt": prompt},
        return_source_documents=False,
        verbose=False
    )

    print("RAG chain initialized successfully")
    return _qa_chain


def query_rag(message: str, language: str = "en") -> str:
    try:
        chain = get_qa_chain()
        result = chain.invoke({"question": message})
        return result["answer"]
    except Exception as e:
        print(f"RAG query error: {e}")
        raise e  
    
def get_scheme_recommendations(
    crop: str,
    land_size: float,
    annual_income: int,
    category: str,
    state: str = "Karnataka"
) -> str:
    query = f"""
    A farmer needs scheme recommendations with these details:
    - Crop grown: {crop}
    - Land size: {land_size} acres
    - Annual income: Rs {annual_income}
    - Social category: {category}
    - State: {state}
    
    List all government schemes this farmer qualifies for.
    For each scheme explain:
    1. Why they qualify
    2. Exact benefit amount
    3. Documents needed
    4. How to apply
    
    Be specific and practical.
    """
    return query_rag(query, "en")