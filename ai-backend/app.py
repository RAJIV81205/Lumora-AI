from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pdfplumber
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the file to the upload folder
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Extract text if the file is a PDF
    if file.filename.endswith('.pdf'):
        try:
            with pdfplumber.open(file_path) as pdf:
                text = ''.join([page.extract_text() for page in pdf.pages])
            return jsonify({'text': text}), 200
        except Exception as e:
            return jsonify({'error': f'Failed to process PDF: {str(e)}'}), 500
    else:
        return jsonify({'error': 'Unsupported file type. Only PDFs are supported for text extraction.'}), 400

if __name__ == '__main__':
    app.run(debug=True)

