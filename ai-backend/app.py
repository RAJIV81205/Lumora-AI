from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import openai

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set your OpenAI API key
openai.api_key = "YOUR_OPENAI_API_KEY"  # Replace this

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize embedding model and FAISS index
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
vector_index = faiss.IndexFlatL2(384)  # Embedding dim = 384
text_chunks = []

# Utility: Split text into chunks
def split_text(text, max_tokens=200):
    paragraphs = text.split('\n\n')
    chunks, chunk = [], ''
    for p in paragraphs:
        if len(chunk.split()) + len(p.split()) <= max_tokens:
            chunk += ' ' + p
        else:
            chunks.append(chunk.strip())
            chunk = p
    if chunk:
        chunks.append(chunk.strip())
    return chunks

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

            # Step 1: Split
            chunks = split_text(text)

            # Step 2: Embed
            embeddings = embedding_model.encode(chunks)
            vector_index.add(np.array(embeddings))
            text_chunks.extend(chunks)

            return jsonify({'message': 'PDF processed and indexed'}), 200
        except Exception as e:
            return jsonify({'error': f'PDF processing failed: {str(e)}'}), 500
    else:
        return jsonify({'error': 'Only PDFs are supported'}), 400

# Ask a question and get AI answer
@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    # Step 1: Find top similar chunks using FAISS
    query_embedding = embedding_model.encode([question])
    _, top_indices = vector_index.search(np.array(query_embedding), k=3)
    context = ' '.join([text_chunks[i] for i in top_indices[0]])

    # Step 2: Ask OpenAI Chat model
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful study assistant."},
                {"role": "user", "content": f"Based on this context:\n{context}\nAnswer this question:\n{question}"}
            ],
            temperature=0.3
        )
        answer = response['choices'][0]['message']['content']
        return jsonify({
            "answer": answer,
            "context": context
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
