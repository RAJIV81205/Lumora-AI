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
    8. End with key takeaways or study tips"""
    
    user_prompt = f"Please summarize the following study material:\n\n{text}"
    
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

if __name__ == '__main__':
    app.run(debug=True) 