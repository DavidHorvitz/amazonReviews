import axios from 'axios';

async function fetch_test_csv() {
  // כתובת השרת
  const serverUrl = 'http://localhost:5000/api/data';
  try {
    const response = await axios.get(serverUrl);
    // הנתונים נמצאים בתוך response.data
    // console.log(response.data);
    return response.data; // מחזירים את הנתונים עבור שימוש נוסף
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // זריקת שגיאה עבור טיפול חיצוני
  }
}

export default fetch_test_csv;
