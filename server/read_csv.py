# import pandas as pd

# # הגדרת נתיב לקובץ CSV
# file_path = 'C:/Users/User/Documents/amazon_test/test.csv'

# # קריאת הקובץ CSV
# df = pd.read_csv(file_path)

# # הצגת הנתונים
# print(df)
import pandas as pd

# # הגדרת נתיב לקובץ CSV
# file_path = 'C:/Users/User/Documents/amazon_test/test.csv'

# # קריאת הקובץ CSV עם הגבלה ל-500 רשומות
# df = pd.read_csv(file_path, nrows=10)

# הצגת הנתונים
def read_csv_data():
    try:
        file_path = 'C:/Users/User/Documents/amazon_test/test.csv'
        # קריאת הקובץ CSV עם הגבלה ל-500 רשומות
        df = pd.read_csv(file_path, nrows=40)
        print(df)
        return df
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None