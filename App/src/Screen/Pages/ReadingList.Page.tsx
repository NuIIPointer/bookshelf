import { Layout, Text, useStyleSheet } from '@ui-kitten/components';
import React, { useContext, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import BookList from '../../Components/BookShelf/BookShelf';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';

export const ReadingListScreen = () => {
    const { storedBooks, bookmarkList } = useContext(GoogleBookContext);
    const styles = useStyleSheet(themedStyles);
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
        <Layout style={{ flex: 1 }}>
            <ScrollView>
                <Layout style={styles.tab}>
                    <Text category="h1" style={styles.headline}>
                        Mein Bücherregal
                    </Text>
                    <BookList books={sortedBooks} variant="large" />
                </Layout>
            </ScrollView>
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    tab: {
        paddingHorizontal: 32,
        paddingBottom: 0,
        paddingTop: 24,
        flex: 1,
        backgroundColor: 'color-primary-500',
    },
    headline: {
        fontSize: 50,
        marginBottom: 32,
    },
});
