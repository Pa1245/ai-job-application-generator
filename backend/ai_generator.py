import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(os.getenv("GEMINI_MODEL"))

def generate_tailored_resume(resume_text, job_description):
    prompt = f"""
    Act as a career coach with 20+ years of experience. 
    You have helped countless students tailor their resumes.
    You have been provided a resume and a job description. 
    Rewrite ATS-friendly resume for the job description.
    Do not make up any stuff in the resume. Only use the facts provided in the resume and rewrite them to better suit the job description.

    # Resume - 
    {resume_text}

    # Job Description - 
    {job_description}

    # Output structure
    ## Resume evaluation
    ## Tailored Resume
    
    """

    response = model.generate_content(prompt)
    output = response.text.split("Tailored Resume")
    resume_eval = output[0].strip()
    print(response.text)
    tailored_resume = output[1].strip() if len(output) > 1 else ""
    return tailored_resume

def generate_cover_letter(tailored_resume_text, job_description):
    prompt = f"""
    Act as a career coach with 20+ years of experience. 
    You have helped countless students write cover letter.
    You have been provided a job description and a resume tailored to that job description.
    Generate a cover letter for the job. 
    Do not make up any stuff in the cover letter. Only use the facts provided in the tailored resume.

    # Tailored Resume - 
    {tailored_resume_text}

    # Job Description - 
    {job_description}

    # Output structure
    ## Cover Letter
    """

    response = model.generate_content(prompt)
    output = response.text.split("Cover Letter")
    print(response.text)
    cover_letter = output[1].strip() if len(output) > 1 else ""
    return cover_letter

def generate_documents(resume_text, job_description):
    tailored_resume = generate_tailored_resume(resume_text, job_description)
    cover_letter = generate_cover_letter(tailored_resume, job_description)
    return tailored_resume, cover_letter