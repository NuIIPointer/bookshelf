import { useContext, useMemo } from 'react';

import { GoogleBookContext } from '../Context/GoogleBooks.Context';
import storedPageRecentReadingValue from './storedPageRecentReadingValue';

const useStoredPageRecentReadingValue = (bookId: string) => {
    const { storedBooks } = useContext(GoogleBookContext);

    const book = storedBooks[bookId];
    const pagesRead = useMemo(() => storedPageRecentReadingValue(book), [book]);

    return pagesRead;
};

export default useStoredPageRecentReadingValue;
