from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import os
from openai import OpenAI
from config import OPENAI_API_KEY
import json

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
    10. Use Markdown formatting for better readability
    11. Format all mathematical equations using KaTeX syntax:
        - For inline math, use single dollar signs: $E = mc^2$
        - For display math, use double dollar signs: $$F = ma$$
        - Always use proper LaTeX syntax for all mathematical expressions"""
    
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
    system_prompt = """You are an expert educational assistant specializing in creating comprehensive and detailed study guides for academic materials. 
    Your goal is to help students master complex topics by providing structured, detailed, and visually appealing study guides.

    Format your response exactly as follows:
    
    # TITLE: [Insert descriptive title]
    
    ## OVERVIEW: [Insert a brief overview paragraph about the topic]
    
    ## [Section 1 Title]
    [Section 1 Content with explanations, definitions, examples, etc.]
    
    ## [Section 2 Title]
    [Section 2 Content with explanations, definitions, examples, etc.]
    
    ## [Continue with additional sections...]
    
    ## Key Terms
    - **[Term 1]**: [Definition]
    - **[Term 2]**: [Definition]
    - [And so on...]
    
    ## Tips for Studying This Topic
    - [Tip 1]
    - [Tip 2]
    - [And so on...]
    
    When creating this study guide:
    1. Use clear section titles that highlight main concepts
    2. Provide detailed explanations with examples in each section
    3. Format all mathematical equations using KaTeX syntax:
       - For inline math, use single dollar signs: $E = mc^2$
       - For display math, use double dollar signs: $$F = ma$$
    4. Use Markdown for formatting: headers (##), bullet points, bold (**text**), etc.
    5. Include helpful diagrams described in text if relevant
    6. Make sure each section has enough detail to be useful but remains clear and concise"""

    user_prompt = f"Please create a comprehensive and detailed study guide for the following material:\n\n{text}."

    try:
        completion = api.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.5,
            max_tokens=3000,  # Increased token limit for more detailed responses
        )

        study_guide = completion.choices[0].message.content

        # Return the study guide content directly as a string
        # This is what your frontend expects based on your React component
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
    app.run(debug=True)