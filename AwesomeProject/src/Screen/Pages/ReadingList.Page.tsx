import { Layout, Text } from '@ui-kitten/components';
import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import BookList from '../../Components/BookShelf';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';

export const ReadingListScreen = () => {
    const { storedBooks, bookmarkList } = useContext(GoogleBookContext);
    const sortedKeys = useMemo(
        () =>
            Object.keys(storedBooks).sort((a, b) => {
                const creationDateA = bookmarkList[a]?.creationDate;
                const creationDateB = bookmarkList[b]?.creationDate;

                if (creationDateA < creationDateB) {
                    return 1;
                }

                if (creationDateA > creationDateB) {
                    return -1;
                }

                return 0;
            }),
        [storedBooks, bookmarkList]
    );
    const sortedBooks = useMemo(
        () => sortedKeys.map((bookId) => storedBooks[bookId]),
        [sortedKeys, storedBooks]
    );

    return (
        <Layout style={styles.tab}>
            <Text category="h1">ReadingList</Text>
            <BookList books={sortedBooks} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    tab: {
        padding: 16,
        paddingTop: 75,
        height: 800,
        flex: 1,
    },
});
