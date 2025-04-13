from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import os
from openai import OpenAI
from config import OPENAI_API_KEY

base_url = "https://api.aimlapi.com/v1"
api_key = OPENAI_API_KEY
api = OpenAI(api_key=api_key, base_url=base_url)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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
    10. Use Markdown formatting for better readability"""
    
    user_prompt = f"Please summarize the following study material:\n\n{text}."
    
    try:
        completion = api.chat.completions.create(
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
    system_prompt = """You are an expert educational assistant specializing in creating comprehensive study guides for academic materials. 
    Your goal is to help students master complex topics by providing detailed explanations, examples, and practice opportunities.
    
    When creating a study guide:
    1. Provide a thorough overview of the entire chapter or topic
    2. Break down complex concepts into understandable components
    3. Include detailed explanations for all important concepts
    4. Define all technical terms and jargon
    5. Provide multiple examples to illustrate key points
    6. Include diagrams or visual explanations where appropriate (in text form)
    7. Create practice questions or problems to test understanding
    8. Highlight connections between different concepts
    9. Include memory aids or mnemonics for difficult concepts
    10. Organize content in a logical, hierarchical structure
    11. Use Markdown formatting for better readability
    12. Include a section on common misconceptions and how to avoid them
    13. Provide tips for effective study and retention
    14. Include a glossary of key terms
    15. Add a section on how this topic connects to other related topics"""
    
    user_prompt = f"Please create a comprehensive study guide for the following material:\n\n{text}."
    
    try:
        completion = api.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.5,
            max_tokens=2000,
        )
        
        study_guide = completion.choices[0].message.content
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
            return jsonify({'text': text}), 200
        except Exception as e:
            return jsonify({'error': f'PDF processing failed: {str(e)}'}), 500
    else:
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
    
    return jsonify({'study_guide': study_guide}), 200

if __name__ == '__main__':
    app.run(debug=True) 