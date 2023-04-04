import axios from 'axios';

const bookSearchRequest = (searchParams) =>
    axios.get(
        `https://www.googleapis.com/books/v1/volumes?key=${process.env.GOOGLE_BOOKS_API_KEY}`,
        {
            params: searchParams,
        }
    );

export default bookSearchRequest;
