from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os

def load_documents():
    data_path = os.path.join(os.path.dirname(__file__), "../data")
    
    loader = DirectoryLoader(
        data_path,
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"}
    )
    
    documents = loader.load()
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        separators=["\n## ", "\n### ", "\n\n", "\n", " "]
    )
    
    chunks = splitter.split_documents(documents)
    print(f"Loaded {len(documents)} documents → {len(chunks)} chunks")
    return chunks