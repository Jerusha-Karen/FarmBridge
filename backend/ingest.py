from rag.loader import load_documents
from rag.embeddings import build_vectorstore

if __name__ == "__main__":
    print("Starting knowledge base ingestion...")
    chunks = load_documents()
    build_vectorstore(chunks)
    print("Done! Knowledge base is ready.")