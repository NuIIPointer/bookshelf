import { Layout, useStyleSheet } from '@ui-kitten/components';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import BookListItem from './BookShelfItem';
import { StoredBook, BookSearchResult } from '../../Context/GoogleBooks.Context';

const BookList = ({ books }: { books: ArrayLike<StoredBook & BookSearchResult> }) => {
    const styles = useStyleSheet(themedStyles);

    return (
        <Layout style={styles.container}>
            <FlatList
                data={books}
                renderItem={({ item }) => <BookListItem item={item} key={item.id} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                style={styles.bookList}
                removeClippedSubviews={false}
            />
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
    },
    bookList: {
        paddingHorizontal: 14, // scrollbar offset for web
        marginHorizontal: -14,
    },
    listContainer: {
        // marginTop: 16,
    },
});

export default BookList;
