import { useContext, useMemo } from 'react';

import storedPageRecentReadingValue from './storedPageRecentReadingValue';
import { GoogleBookContext } from '../Context/GoogleBooks.Context';

const useStoredPageRecentReadingValue = (bookId: string) => {
    const { storedBooks } = useContext(GoogleBookContext);

    const book = storedBooks[bookId];
    const pagesRead = useMemo(() => storedPageRecentReadingValue(book), [book]);

    return pagesRead;
};

export default useStoredPageRecentReadingValue;
