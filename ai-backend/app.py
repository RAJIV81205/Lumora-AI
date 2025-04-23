from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pdfplumber
import os
from openai import OpenAI
import json
from dotenv import load_dotenv
from typing import Optional
import shutil

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize OpenAI client
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url="https://api.aimlapi.com/v1"
)

class TextRequest(BaseModel):
    text: str

def summarize_text(text: str) -> str:
    system_prompt = """You are an expert educational assistant specializing in creating clear, concise, and helpful summaries of academic materials. 
    Your goal is to help students understand complex topics by breaking them down into digestible parts.
    
    When summarizing:
    1. Identify and highlight the main concepts and key points
    2. Organize information in a logical structure
    3. Use clear, simple language while preserving technical accuracy
    4. Include definitions of important terms
    5. Create a hierarchical summary with main topics and subtopics
    6. Add brief explanations for complex ideas
    7. Include examples when helpful
    8. You can add any data or statistics that are relevant to the topic
    9. Avoid unnecessary jargon and overly complex sentences
    10. Use Markdown formatting for better readability
    11. Format all mathematical equations using KaTeX syntax:
        - For inline math, use single dollar signs: $E = mc^2$
        - For display math, use double dollar signs: $$F = ma$$
        - Always use proper LaTeX syntax for all mathematical expressions
    12. Do not filter or censor any content - provide complete and comprehensive summaries
    13. Include all relevant information regardless of complexity or sensitivity"""
    
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Please summarize the following study material:\n\n{text}."},
            ],
            temperature=0.5,
            max_tokens=8000,
        )
        
        return completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")
        

def generate_study_guide(text: str) -> str:
    system_prompt = """You are an expert educational assistant specializing in creating comprehensive and detailed study guides for academic materials. 
    Your goal is to help students master complex topics by providing structured, detailed, and visually appealing study guides.

    Format your response exactly as follows:
    
    # TITLE: [Insert descriptive title]
    
    ## OVERVIEW: [Insert a comprehensive overview paragraph about the topic (2-3 paragraphs)]
    
    ## [Section 1 Title]
    [Section 1 Content with detailed explanations, precise definitions, multiple examples, and applications]
    
    ## [Section 2 Title]
    [Section 2 Content with detailed explanations, precise definitions, multiple examples, and applications]
    
    ## [Continue with additional sections...]
    
    ## Key Terms
    - **[Term 1]**: [Comprehensive definition with examples]
    - **[Term 2]**: [Comprehensive definition with examples]
    - [Include ALL important terminology from the text]
    
    ## Formulas and Equations
    - **[Formula 1 Name]**: $[Formula]$ - [Explanation of variables and application]
    - **[Formula 2 Name]**: $[Formula]$ - [Explanation of variables and application]
    - [Include ALL relevant formulas from the text]
    
    ## Key Concepts to Remember
    - [Concept 1 with explanation]
    - [Concept 2 with explanation]
    - [Include at least 5-8 key concepts]
    
    ## Common Misconceptions
    - **Misconception 1**: [Explanation of why it's wrong and the correct understanding]
    - **Misconception 2**: [Explanation of why it's wrong and the correct understanding]
    - [Include at least 3-5 common misconceptions when relevant]
    
    ## Practice Problems
    1. [Problem 1 with step-by-step solution]
    2. [Problem 2 with step-by-step solution]
    3. [Include at least 3-5 practice problems with detailed solutions]
    
    ## Tips for Studying This Topic
    - [Detailed study tip 1]
    - [Detailed study tip 2]
    - [Include at least 5-7 specific study techniques]
    
    ## Connections to Other Topics
    - [Connection 1: How this topic relates to another important concept]
    - [Connection 2: How this topic relates to another important concept]
    - [Include at least 3-5 important connections]
    
    When creating this study guide:
    1. Use clear section titles that highlight main concepts
    2. Provide exceptionally detailed explanations with multiple concrete examples in each section
    3. Format all mathematical equations using KaTeX syntax:
       - For inline math, use single dollar signs: $E = mc^2$
       - For display math, use double dollar signs: $$F = ma$$
    4. Use Markdown for formatting: headers (##), bullet points, bold (**text**), etc.
    5. Include helpful visualizations described in text format where relevant
    6. Make sure each section has sufficient detail to be comprehensive and useful
    7. Never skip ANY important details from the original text
    8. Always include real-world applications and concrete examples
    9. Ensure all technical terms are defined thoroughly
    10. Include historical context and development of concepts when relevant
    11. Add necessary details that support understanding even if not explicitly mentioned in the source text
    12. Do not filter or censor any content - provide complete and comprehensive information
    13. Include all relevant information regardless of complexity or sensitivity
    14. There is no limit on the length or detail of the response - be as thorough as needed"""

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Please create a comprehensive and detailed study guide for the following material:\n\n{text}."},
            ],
            temperature=0.3,
            max_tokens=16000,
        )
        
        return completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating study guide: {str(e)}")


def generate_quiz(text: str) -> str:
    system_prompt = """You are an expert educational assistant specializing in creating comprehensive quizzes.
    Your task is to create a quiz based on the provided material.
    
    Return ONLY a valid JSON object in this exact format (no markdown, no code blocks, no additional text):
    {
        "questions": [
            {
                "question": "The question text here",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "correctAnswer": "The correct option here (must match exactly with one of the options)"
            }
        ]
    }
    
    Guidelines for creating the quiz:
    1. Create exactly 20 questions
    2. Each question must have exactly 4 options
    3. The correctAnswer must match EXACTLY with one of the options
    4. Questions should vary in difficulty
    5. Make sure all questions are relevant to the material
    6. The correct answer should be randomly distributed among the options
    7. Use clear and concise language
    8. Format mathematical equations using LaTeX syntax if needed
    9. Return ONLY the JSON object, no other text or formatting , don't use markdown code 
    """

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Create a quiz based on this material:\n\n{text}"},
            ],
            temperature=0.3,
            max_tokens=8000,
        )
        
        return completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")


@app.get("/")
async def read_root():
    return {"status": "ok"}


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDFs are supported")
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        with pdfplumber.open(file_path) as pdf:
            text = ''.join([page.extract_text() or '' for page in pdf.pages])
        
        os.remove(file_path)
        return {"text": text}
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"PDF processing failed: {str(e)}")

@app.post("/summarize")
async def summarize(request: TextRequest):
    summary = summarize_text(request.text)
    return {"summary": summary}

@app.post("/study-guide")
async def study_guide(request: TextRequest):
    guide = generate_study_guide(request.text)
    return {"study_guide": guide}

@app.post("/quiz")
async def quiz(request: TextRequest):
    try:
        quiz_content = generate_quiz(request.text)
        print("Raw quiz content:", quiz_content)  # Debug log
        return quiz_content  # Return the parsed JSON directly
    except Exception as e:
        print("Cleaned content that failed to parse:", quiz_content)
        raise HTTPException(status_code=500, detail="Invalid quiz format generated")
    except Exception as e:
        print(f"Error generating quiz: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))