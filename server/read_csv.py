from flask import Flask, request, jsonify
import pandas as pd
from collections import Counter
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import requests
import time

app = Flask(__name__)

def read_csv_data(chunk_size, chunk_number, delay=1):
    try:
        file_path = 'C:/Users/User/Documents/amazon_test/train.csv'
        start_index = (chunk_number - 1) * chunk_size  
        end_index = start_index + chunk_size 
        chunk = pd.read_csv(file_path, skiprows=range(1, start_index), nrows=chunk_size)
        # time.sleep(delay)  
        return chunk
    except Exception as e:
        print(f"An error occurred while reading CSV file: {str(e)}")
        return pd.DataFrame()

   

def filter_positive_sentiment(df):
    try:
        positive_reviews_df = df[df.iloc[:, 0] == 2]
        return positive_reviews_df
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def filter_negative_sentiment(df):
    try:
        negative_reviews_df = df[df.iloc[:, 0] == 1]
        return negative_reviews_df
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def process_reviews(df, category):
    try:
        if category == 'positive':
            reviews_df = filter_positive_sentiment(df)
        elif category == 'negative':
            reviews_df = filter_negative_sentiment(df)
        else:
            return {'error': 'Invalid category parameter'}

        reviews_df.iloc[:, 1] = reviews_df.iloc[:, 1].astype(str)
        reviews_df.iloc[:, 2] = reviews_df.iloc[:, 2].astype(str)

        text = ' '.join(reviews_df.iloc[:, 1]) + ' ' + ' '.join(reviews_df.iloc[:, 2])
        words = word_tokenize(text)
        words = [word.lower() for word in words if word.isalnum() and word.lower() not in stopwords.words('english')]
        word_counts = Counter(words)

        return {'words': word_counts.most_common(10)}

    except Exception as e:
        return {'error': str(e)}
