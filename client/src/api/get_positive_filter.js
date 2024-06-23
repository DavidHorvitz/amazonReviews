import axios from 'axios';

async function get_positive_filter() {
  const serverUrl = 'http://localhost:5000/api/filter/positive';
  try {
    const response = await axios.get(serverUrl);
    return response.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default get_positive_filter;
