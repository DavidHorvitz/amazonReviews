from flask import Flask, jsonify
from read_csv import read_csv_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/api/data')
def get_data():
    # קבלת נתוני ה-CSV והמרתם לפורמט JSON
    data = read_csv_data().to_json(orient='records')
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
