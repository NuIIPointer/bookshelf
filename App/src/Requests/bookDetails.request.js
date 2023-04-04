import axios from 'axios';

const bookDetailsRequest = (bookId) =>
    axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

export default bookDetailsRequest;
