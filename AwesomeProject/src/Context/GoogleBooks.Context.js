import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { GOOGLE_BOOKS_API_KEY } from '../env-variables';

export const GoogleBookContext = createContext();

let requestTimeout;

const GoogleBookContextProvider = ({ children }) => {
    const [bookSearchQuery, setBookSearchQuery] = useState('der kleine Prinz');
    const [bookSearchResults, setBookSearchResults] = useState([]);

    const searchAction = () => {
        const searchParams = {
            q: bookSearchQuery, // Suchbegriff
            maxResults: 20, // maximale Anzahl von Suchergebnissen
            printType: 'books', // nur Bücher anzeigen
        };

        // Senden Sie eine API-Anfrage an die Google Books API und speichern Sie die Ergebnisse im State.
        axios.get(`https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_BOOKS_API_KEY}`, { params: searchParams })
        .then(response => {
            const booksData = response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
            }));
            setBookSearchResults(booksData);
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        // Stellen Sie die Suchparameter für die API-Anfrage ein
        clearTimeout(requestTimeout)
        requestTimeout = setTimeout(searchAction, 1000);
    }, [bookSearchQuery]);

    return (
        <GoogleBookContext.Provider value={{ bookSearchQuery, setBookSearchQuery, bookSearchResults }}>
        {children}
        </GoogleBookContext.Provider>
    );
};

export default GoogleBookContextProvider;
