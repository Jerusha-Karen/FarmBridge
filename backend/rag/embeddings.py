from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv
import shutil
import os

load_dotenv()

CHROMA_PATH = os.path.join(os.path.dirname(__file__), "../chroma_db")

def get_embeddings():
    return HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True}
    )

def get_vectorstore():
    embeddings = get_embeddings()
    return Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings,
        collection_name="krishimitra_kb"
    )

def build_vectorstore(chunks):
    print("Building vector store...")

    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)
        print("Cleared old vector store")

    embeddings = get_embeddings()
    print("Loading embedding model (downloading ~90MB first time)...")

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_PATH,
        collection_name="krishimitra_kb"
    )

    print(f"Vector store built and saved to {CHROMA_PATH}")
    return vectorstore