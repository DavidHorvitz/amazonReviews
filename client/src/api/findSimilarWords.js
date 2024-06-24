import axios from 'axios';

async function findSimilarWords(searchText, category = undefined) {
    console.log("word, category:", searchText, category); // Log to check if word and category are defined
    const serverUrl = 'http://localhost:5000/api/find_similar_words';
    const data = {
        word: searchText,
        category: category
    };
    try {
        const response = await axios.post(serverUrl, data);
        console.log("findSimilarWords response", response);
        return response.data;
    } catch (error) {
        console.error('Error fetching similar words:', error);
        throw error;
    }
}

export default findSimilarWords;
