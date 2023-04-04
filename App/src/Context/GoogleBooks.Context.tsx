import { differenceInDays } from 'date-fns';
import React, { createContext, useState, useEffect, useCallback } from 'react';

import { retrieveData, storeData } from './AsyncStorage';
import objDeepMerge from '../Helper/objDeepMerge';
import bookDetailsRequest from '../Requests/bookDetails.request';
import bookSearchRequest from '../Requests/bookSearch.request';

type GoogleBookSearchItem = {
    creationDate: number;
};
type GoogleBookSearchItems = {
    [x: string]: GoogleBookSearchItem;
};
type ReadingListItem = { [x: string]: { creationDate: number } };
export type StoredBook = {
    volumeInfo?: {
        imageLinks: {
            thumbnail: string;
        };
        title?: string;
        authors?: string[];
        pageCount?: number;
    };
    id: string;
    customData?: {
        creationDate?: number;
        pagesRead?: number;
    };
};
type StoredBooks = {
    [x: string]: StoredBook;
};
export type BookSearchResult = {
    title?: string;
    authors?: string[];
    thumbnail?: string;
    id: string;
};
type BookSearchResults = BookSearchResult[];

export const GoogleBookContext = createContext<{
    bookSearchQuery?: string;
    setBookSearchQuery: Function;
    bookSearchResults: BookSearchResults;
    readingList: ReadingListItem;
    toggleReadingList: Function;
    bookmarkList: GoogleBookSearchItems;
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
    const [readingList, setReadingList] = useState<ReadingListItem>({});
    const [bookmarkList, setBookmarkList] = useState<GoogleBookSearchItems>({});
    const [storedBooks, setStoredBooks] = useState<StoredBooks>({});
    const [timerId, setTimerId] = useState(null);
    const [initialFetched, setInitialFetched] = useState(false);

    useEffect(() => {
        console.log('stored', storedBooks);
    }, [storedBooks]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const tmpBookmarkList = await retrieveData('bookmarkList');
            if (tmpBookmarkList) {
                setBookmarkList(JSON.parse(tmpBookmarkList));
            }
            const tmpReadingList = await retrieveData('readingList');
            if (tmpReadingList) {
                setReadingList(JSON.parse(tmpReadingList));
            }
            const tmpStoredBooks = await retrieveData('storedBooks');
            if (tmpStoredBooks) {
                setStoredBooks(JSON.parse(tmpStoredBooks));
            }

            setInitialFetched(true);
        };

        fetchInitialData();
    }, []);

    // store bookmarks in app storage
    useEffect(() => {
        initialFetched && storeData('bookmarkList', JSON.stringify(bookmarkList));
    }, [bookmarkList, initialFetched]);

    // store readingList in app storage
    useEffect(() => {
        initialFetched && storeData('readingList', JSON.stringify(readingList));
    }, [readingList, initialFetched]);

    // store storedBooks in app storage
    useEffect(() => {
        initialFetched && storeData('storedBooks', JSON.stringify(storedBooks));
    }, [storedBooks, initialFetched]);

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
                const maxDateDiff = 7;
                if (
                    !storedBooks[bookId] ||
                    differenceInDays(
                        storedBooks[bookId]?.customData?.creationDate || 0,
                        new Date()
                    ) > maxDateDiff
                ) {
                    return new Promise<void>((resolve) => {
                        bookDetailsRequest(bookId).then((response) => {
                            if (response.data) {
                                tmpStoredBooks[bookId] = {
                                    ...response.data,
                                    customData: {
                                        creationDate: new Date().getTime(),
                                    },
                                };
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

        initialFetched && storeBooks();
    }, [initialFetched, storedBooks, bookmarkList, readingList]);

    const toggleReadingList = (bookId: string) => {
        if (!readingList[bookId]) {
            setReadingList({ ...readingList, [bookId]: { creationDate: new Date().getTime() } });
        } else {
            const newBookmarks: ReadingListItem = {};
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
            const newBookmarks: GoogleBookSearchItems = {};
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

    const editStoredBook = (bookId: string, newData: { [x: string]: any }) => {
        const bookToEdit = storedBooks[bookId];
        const newObject = {
            ...objDeepMerge(storedBooks, {
                [bookId]: {
                    ...objDeepMerge(bookToEdit, newData),
                },
            }),
        };

        console.log('edit', newObject);

        setStoredBooks(newObject);

        console.log('after state');
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
                editStoredBook,
            }}>
            {children}
        </GoogleBookContext.Provider>
    );
};

export default GoogleBookContextProvider;
