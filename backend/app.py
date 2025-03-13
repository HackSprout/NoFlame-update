from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/location', methods=['POST'])
def location():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    print(f"Received Latitude: {latitude}, Longitude: {longitude}")

    return jsonify({"status": "success", "latitude": latitude, "longitude": longitude})

@app.route('/getLongLat', methods=['GET'])
def getLongLat():
    # data = request.json
    latitude = 48.864716
    longitude = 2.349014

    return jsonify({'latitude': latitude, 'longitude': longitude})

@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})

if __name__ == "__main__":
    app.run(debug=True)
