import axios from 'axios';

import { GOOGLE_BOOKS_API_KEY } from '../env-variables';

const bookDetailsRequest = (bookId) =>
    axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`);

export default bookDetailsRequest;
