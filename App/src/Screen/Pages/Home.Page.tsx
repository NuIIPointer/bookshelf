import { Text, Layout, Input } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import BookList from '../../Components/BookShelf';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';

export const HomeScreen = () => {
    const { bookSearchResults, bookSearchQuery, setBookSearchQuery } =
        useContext(GoogleBookContext);
    console.log('bookSearchResults', bookSearchResults.length);

    return (
        <Layout style={styles.tab}>
            <Text category="h1" style={{ marginBottom: 16 }}>
                Buch-Liste
            </Text>
            <Input
                placeholder="EIngabe tätigen"
                value={bookSearchQuery}
                onChangeText={(nextValue) => setBookSearchQuery(nextValue)}
            />
            <BookList books={bookSearchResults} />
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
