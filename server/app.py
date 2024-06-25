from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from read_csv import read_csv_data, filter_positive_sentiment, filter_negative_sentiment, process_reviews
from find_similar_meaning_words import find_similar_meaning_words_from_file
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        chunk_size = request.args.get('chunk_size', default=2000, type=int)
        chunk_number = request.args.get('chunk_number', default=1, type=int)

        data = read_csv_data(chunk_size, chunk_number)
        if not data.empty:
            return jsonify(data.to_json(orient='records'))
        else:
            return jsonify({'error': 'Failed to read data or chunk number is out of range'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/filter/positive', methods=['GET'])
def filter_positive_data():
    try:
        chunk_size = request.args.get('chunk_size', default=2000, type=int)
        chunk_number = request.args.get('chunk_number', default=1, type=int)

        df = read_csv_data(chunk_size, chunk_number)
        if df is not None:
            filtered_data = filter_positive_sentiment(df)
            if filtered_data is not None:
                return jsonify(filtered_data.to_json(orient='records'))
            else:
                return jsonify({'error': 'Failed to filter positive data'}), 500
        else:
            return jsonify({'error': 'Failed to read data'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/filter/negative', methods=['GET'])
def filter_negative_data():
    try:
        chunk_size = request.args.get('chunk_size', default=2000, type=int)
        chunk_number = request.args.get('chunk_number', default=1, type=int)

        df = read_csv_data(chunk_size, chunk_number)
        if df is not None:
            filtered_data = filter_negative_sentiment(df)
            if filtered_data is not None:
                return jsonify(filtered_data.to_json(orient='records'))
            else:
                return jsonify({'error': 'Failed to filter negative data'}), 500
        else:
            return jsonify({'error': 'Failed to read data'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/process', methods=['GET'])
def process_data():
    try:
        category = request.args.get('category')  
        chunk_size = request.args.get('chunk_size', default=2000, type=int)
        chunk_number = request.args.get('chunk_number', default=1, type=int)

        df = read_csv_data(chunk_size, chunk_number)
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
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/api/find_similar_words', methods=['POST'])
def find_similar_words():
    data = request.json
    word = data.get('word', {}).get('searchText')
    category = data.get('word', {}).get('category')
    print("Received word:", word)
    print("Received category:", category)
    file_path = 'C:/Users/User/Documents/amazon_test/test.csv'
    similar_words = find_similar_meaning_words_from_file(file_path, word, category)
    return jsonify(similar_words), 200


if __name__ == '__main__':
    app.run(debug=True)
    
    
    
    
    
    
    
    
    
