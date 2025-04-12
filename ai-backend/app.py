from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

if __name__ == '__main__':
    app.run(debug=True) 