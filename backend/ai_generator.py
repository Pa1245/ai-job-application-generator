import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-pro")

def generate_documents(resume_text, job_description):
    prompt = f"""
You are a career coach. Rewrite the following resume for the job described below.

Resume:
{resume_text}

Job Description:
{job_description}

# Output Structure - 
1. Tailored Resume: 

2. Tailored Cover Letter:
"""
    response = model.generate_content(prompt)
    output = response.text.split("Tailored Cover Letter")
    tailored_resume = output[0].strip()
    cover_letter = output[1].strip() if len(output) > 1 else ""
    return tailored_resume, cover_letter