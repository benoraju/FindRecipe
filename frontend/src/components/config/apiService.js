// apiService.js

import axios from 'axios';

const APP_ID = 'b0aee4b9';
const APP_KEY = 'ac2df2ec55449b75b72b56088f8ccdcc';

const edamamAPI = axios.create({
  baseURL: 'https://api.edamam.com/api/recipes/v2',
  params: {
    type: 'public',
    app_id: APP_ID,
    app_key: APP_KEY
  }
});

export const searchRecipes = async (query) => {
  try {
    const response = await edamamAPI.get('', { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching for recipes:', error);
    throw error;
  }
};
