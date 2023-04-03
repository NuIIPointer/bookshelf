import React, { createContext, useState, useEffect } from 'react';

import { retrieveData, storeData } from './AsyncStorage';
import bookDetailsRequest from '../Requests/bookDetails.request';
import bookSearchRequest from '../Requests/bookSearch.request';

type BookList = { [x: string]: { creationDate: number } };
type ReadingList = { [x: string]: { creationDate: number } };
type StoredBooks = { [x: string]: { [x: string]: unknown } };
type BookSearchResults = { [x: string]: unknown }[];

export const GoogleBookContext = createContext<{
    bookSearchQuery?: string;
    setBookSearchQuery: Function;
    bookSearchResults: BookSearchResults;
    readingList: ReadingList;
    toggleReadingList: Function;
    bookmarkList: BookList;
    toggleBookmarkList: Function;
    storedBooks: StoredBooks;
}>({
    bookSearchQuery: '',
    readingList: {},
    storedBooks: {},
    bookmarkList: {},
    bookSearchResults: [],
    toggleReadingList: () => {},
    setBookSearchQuery: () => {},
    toggleBookmarkList: () => {},
});

const GoogleBookContextProvider = ({ children }: { children: string | React.ReactNode }) => {
    const [bookSearchQuery, setBookSearchQuery] = useState('der kleine Prinz');
    const [bookSearchResults, setBookSearchResults] = useState<BookSearchResults>([]);
    const [readingList, setReadingList] = useState<ReadingList>({});
    const [bookmarkList, setBookmarkList] = useState<BookList>({});
    const [storedBooks, setStoredBooks] = useState<StoredBooks>({});
    const [timerId, setTimerId] = useState(null);

    console.log('bookmarkList', bookmarkList);
    console.log('storedBooks', storedBooks);

    useEffect(() => {
        const fetchInitialData = async () => {
            const bookmarks = await retrieveData('bookmarkList');
            if (bookmarks) {
                setBookmarkList(JSON.parse(bookmarks));
            }
        };

        fetchInitialData();
    }, []);

    // store bookmarks in app storage
    useEffect(() => {
        storeData('bookmarkList', JSON.stringify(bookmarkList));
    }, [bookmarkList]);

    // store readingList in app storage
    useEffect(() => {
        storeData('readingList', JSON.stringify(readingList));
    }, [readingList]);

    // store relevant book data
    useEffect(() => {
        const storeBooks = async () => {
            const tmpStoredBooks: StoredBooks = {};
            const bookIdsToStore = { ...readingList, ...bookmarkList };

            Object.keys(storedBooks).forEach((bookId) => {
                if (bookIdsToStore[bookId]) {
                    tmpStoredBooks[bookId] = storedBooks[bookId];
                }
            });

            const promises = Object.keys(bookIdsToStore).map((bookId) => {
                if (!storedBooks[bookId]) {
                    return new Promise<void>((resolve) => {
                        bookDetailsRequest(bookId).then((response) => {
                            if (response.data) {
                                tmpStoredBooks[bookId] = response.data;
                            }

                            resolve();
                        });
                    });
                }
            });

            Promise.all(promises).then(() => {
                if (JSON.stringify(tmpStoredBooks) !== JSON.stringify(storedBooks)) {
                    setStoredBooks(tmpStoredBooks);
                }
            });
        };

        storeBooks();
    }, [storedBooks, bookmarkList, readingList]);

    const toggleReadingList = (bookId: string) => {
        if (!readingList[bookId]) {
            setReadingList({ ...readingList, [bookId]: { creationDate: new Date().getTime() } });
        } else {
            const newBookmarks: ReadingList = {};
            Object.keys(readingList).forEach((e) => {
                if (e !== bookId) {
                    newBookmarks[e] = readingList[e];
                }
            });

            setReadingList(newBookmarks);
        }
    };

    const toggleBookmarkList = (bookId: string) => {
        if (!bookmarkList[bookId]) {
            setBookmarkList({ ...bookmarkList, [bookId]: { creationDate: new Date().getTime() } });
        } else {
            const newBookmarks: BookList = {};
            Object.keys(bookmarkList).forEach((e) => {
                if (e !== bookId) {
                    newBookmarks[e] = bookmarkList[e];
                }
            });

            setBookmarkList(newBookmarks);
        }
    };

    const searchAction = () => {
        const doRequest = () => {
            const searchParams = {
                q: `intitle:${bookSearchQuery}`, // Suchbegriff
                maxResults: 20, // maximale Anzahl von Suchergebnissen
                printType: 'books', // nur Bücher anzeigen
                langRestrict: 'de',
            };

            bookSearchRequest(searchParams)
                .then((response) => {
                    type BookVolume = {
                        id: string;
                        volumeInfo: {
                            title: string;
                            authors?: string[];
                            imageLinks?: { thumbnail: string };
                        };
                    };
                    const booksData = response.data.items.map((item: BookVolume) => ({
                        id: item.id,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors,
                        thumbnail: item.volumeInfo.imageLinks
                            ? item.volumeInfo.imageLinks.thumbnail
                            : null,
                    }));

                    const filteredBooks = booksData.filter(
                        (book: any) => !!book.thumbnail && !!book.authors
                    );

                    setBookSearchResults(filteredBooks);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        // If a timer is already running, clear it
        if (timerId) {
            clearTimeout(timerId);
        }

        const newTimer: any = setTimeout(doRequest, 1000);

        setTimerId(newTimer);
    };

    useEffect(() => {
        searchAction();
    }, [bookSearchQuery]);

    return (
        <GoogleBookContext.Provider
            value={{
                bookSearchQuery,
                setBookSearchQuery,
                bookSearchResults,
                readingList,
                toggleReadingList,
                bookmarkList,
                toggleBookmarkList,
                storedBooks,
            }}>
            {children}
        </GoogleBookContext.Provider>
    );
};

export default GoogleBookContextProvider;
