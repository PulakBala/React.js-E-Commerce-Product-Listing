// services/api.js
import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    console.log(response);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};
