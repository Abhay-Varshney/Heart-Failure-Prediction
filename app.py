from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle

app = Flask(__name__)

# Load the machine learning model
model = pickle.load(open('heart_failure_model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')  # Load the main page (prediction form)

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the frontend
    data = request.get_json()
    
    # Extract features from the request
    age = float(data.get('age'))
    restingBP = float(data.get('restingBP'))
    cholesterol = float(data.get('cholesterol'))
    fastingBS = float(data.get('fastingBS'))
    maxHR = float(data.get('maxHR'))
    exerciseAngina = 1 if data.get('exerciseAngina') == 'Yes' else 0
    oldpeak = float(data.get('oldpeak'))
    gender = 1 if data.get('gender') == 'Male' else 0

    # Prepare input features for the model
    input_features = np.array([[age, restingBP, cholesterol, fastingBS, maxHR, exerciseAngina, oldpeak, gender]])

    # Perform prediction
    prediction = model.predict(input_features)
    result = "High Risk" if prediction[0] == 1 else "Low Risk"

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
