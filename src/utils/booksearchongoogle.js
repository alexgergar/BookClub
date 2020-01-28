import axios from 'axios'
import { GOOGLE_BOOKS_API_KEY } from 'react-native-dotenv';

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.response.use((response) => {

  return {
    status: true,
    code: response.status,
    data: response.data.items
  }

}, (error) => {
  let status = error.response.status;
  return {
    status: false,
    code: status,
    data: error.response.data
  }
});

export default class BookSearching {
  static async searchbook(text) {
    let search = encodeURI(text);
    search = '?q=' + text + '&maxResults=5&orderBy=relevance' + '&key=' + GOOGLE_BOOKS_API_KEY
    return await instance.get(search);
  }

}