import axios from 'axios';

async function filter_by_popular_words(category) {
  const serverUrl = `http://localhost:5000/api/process?category=${category}`;
  try {
    const response = await axios.get(serverUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
}

export default filter_by_popular_words;
