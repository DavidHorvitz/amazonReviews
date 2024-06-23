from flask import Flask, jsonify, request
from flask_cors import CORS
from read_csv import read_csv_data, filter_positive_sentiment, filter_negative_sentiment, process_reviews
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = read_csv_data()
    if data is not None:
        return jsonify(data.to_json(orient='records'))
    else:
        return jsonify({'error': 'Failed to read data'}), 500

@app.route('/api/filter/positive', methods=['GET'])
def filter_positive_data():
    df = read_csv_data()
    if df is not None:
        filtered_data = filter_positive_sentiment(df)
        if filtered_data is not None:
            return jsonify(filtered_data.to_json(orient='records'))
        else:
            return jsonify({'error': 'Failed to filter positive data'}), 500
    else:
        return jsonify({'error': 'Failed to read data'}), 500

@app.route('/api/filter/negative', methods=['GET'])
def filter_negative_data():
    df = read_csv_data()
    if df is not None:
        filtered_data = filter_negative_sentiment(df)
        if filtered_data is not None:
            return jsonify(filtered_data.to_json(orient='records'))
        else:
            return jsonify({'error': 'Failed to filter negative data'}), 500
    else:
        return jsonify({'error': 'Failed to read data'}), 500

@app.route('/api/process', methods=['GET'])
def process_data():
    category = request.args.get('category')  
    df = read_csv_data()
    if df is not None:
        if category == 'positive':
            result = process_reviews(df, 'positive')
            print(result)  
            return jsonify(result), 200
        elif category == 'negative':
            result = process_reviews(df, 'negative')
            print(result)  
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Invalid category parameter'}), 400
    else:
        return jsonify({'error': 'Failed to read data'}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
