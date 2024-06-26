import axios from 'axios';

async function fetch_test_csv() {
  const serverUrl = 'http://localhost:5000/api/data';
  try {
    const response = await axios.get(serverUrl);
    return response.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default fetch_test_csv;
