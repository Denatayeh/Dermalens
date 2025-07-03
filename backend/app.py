from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes and origins by default
model = load_model('model/model.keras')

from io import BytesIO

def preprocess_image(img_file):
    # Read the raw bytes
    img_bytes = img_file.read()
    # Wrap in BytesIO
    img = image.load_img(BytesIO(img_bytes), target_size=(256, 256))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array



@app.route('/api/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    img = preprocess_image(file)
    prediction = model.predict(img)
    confidence = float(np.max(prediction, axis=1)[0])
    class_index = int(np.argmax(prediction, axis=1)[0])

    class_names = ['blackheads', 'whiteheads', 'papules', 'pustules', 'nodules']
    result = class_names[class_index]

    return jsonify({
        'acneType': result,
        'confidence': round(confidence * 100, 2),
        'description': 'Classification complete.'
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)


