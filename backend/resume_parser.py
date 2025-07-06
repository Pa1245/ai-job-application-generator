import fitz  # PyMuPDF
from docx import Document

async def extract_text_from_resume(file):
    contents = await file.read()
    if file.filename.endswith(".pdf"):
        with fitz.open(stream=contents, filetype="pdf") as doc:
            return "\n".join([page.get_text() for page in doc])
    elif file.filename.endswith(".docx"):
        with open("temp.docx", "wb") as f:
            f.write(contents)
        doc = Document("temp.docx")
        return "\n".join([p.text for p in doc.paragraphs])
    return ""