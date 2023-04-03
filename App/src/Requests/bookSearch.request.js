import axios from 'axios';

import { GOOGLE_BOOKS_API_KEY } from '../env-variables';

const bookSearchRequest = (searchParams) =>
    axios.get(`https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`, {
        params: searchParams,
    });

export default bookSearchRequest;
