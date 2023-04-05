import { StoredBook } from '../Context/GoogleBooks.Context';

const storedPageRecentReadingValue = (book: StoredBook) => {
    const pagesReadObj = book?.customData?.pagesRead;
    const keys = Object.keys(pagesReadObj || {}).sort();
    const lastKey = keys[keys.length - 1];
    const mostRecentValue = pagesReadObj?.[lastKey] || 0;

    return mostRecentValue;
};

export default storedPageRecentReadingValue;
