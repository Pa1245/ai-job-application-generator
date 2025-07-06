from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_text_from_resume
from ai_generator import generate_documents

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/generate")
async def generate(job_description: str = Form(...), file: UploadFile = Form(...)):
    resume_text = await extract_text_from_resume(file)
    resume, cover_letter = generate_documents(resume_text, job_description)
    return {"resume": resume, "cover_letter": cover_letter}