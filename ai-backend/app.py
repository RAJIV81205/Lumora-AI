from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import os
from openai import OpenAI
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configure CORS with specific origins and methods
CORS(app, resources={
    r"/*": {
        "origins": ["https://lumora-ai.vercel.app"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize OpenAI client
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url="https://api.aimlapi.com/v1"
)

# Add OPTIONS handler for CORS preflight requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'https://lumora-ai.vercel.app')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

def summarize_text(text):
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
        - Always use proper LaTeX syntax for all mathematical expressions"""
    
    user_prompt = f"Please summarize the following study material:\n\n{text}."
    
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.5,
            max_tokens=1000,
        )
        
        summary = completion.choices[0].message.content
        return summary
    except Exception as e:
        return f"Error generating summary: {str(e)}"

def generate_study_guide(text):
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
    11. Add necessary details that support understanding even if not explicitly mentioned in the source text"""

    user_prompt = f"Please create a comprehensive and detailed study guide for the following material. Make sure to include EVERY important detail, concept, formula, and explanation from the text. Be exceptionally thorough and leave nothing important out:\n\n{text}."

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",  # Consider using a more powerful model if available
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.3,  # Lower temperature for more detailed and comprehensive output
            max_tokens=4000,  # Increased token limit for much more detailed responses
        )

        study_guide = completion.choices[0].message.content

        # Return the study guide content directly as a string
        # This matches what your frontend expects based on your React component
        return study_guide
    except Exception as e:
        return f"Error generating study guide: {str(e)}"

# Upload and process PDF
@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    if file.filename.endswith('.pdf'):
        try:
            with pdfplumber.open(file_path) as pdf:
                text = ''.join([page.extract_text() or '' for page in pdf.pages])
            # Delete the file after processing
            os.remove(file_path)
            return jsonify({'text': text}), 200
        except Exception as e:
            # Make sure to delete the file even if processing fails
            if os.path.exists(file_path):
                os.remove(file_path)
            return jsonify({'error': f'PDF processing failed: {str(e)}'}), 500
    else:
        # Delete the file if it's not a PDF
        os.remove(file_path)
        return jsonify({'error': 'Only PDFs are supported'}), 400

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    summary = summarize_text(text)
    
    return jsonify({'summary': summary}), 200

@app.route('/study-guide', methods=['POST'])
def study_guide():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    study_guide = generate_study_guide(text)
    
    # Return the study guide as a string
    return jsonify({'study_guide': study_guide}), 200

if __name__ == '__main__':
    import hypercorn.asyncio
    import asyncio
    
    config = hypercorn.Config()
    config.bind = ["0.0.0.0:8000"]
    asyncio.run(hypercorn.asyncio.serve(app, config))