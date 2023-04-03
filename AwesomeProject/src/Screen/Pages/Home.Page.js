import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';
import BookList from '../../Components/BookShelf';
import { Input } from '@ui-kitten/components';

export const HomeScreen = () => {
  const { bookSearchResults, bookSearchQuery, setBookSearchQuery } = useContext(GoogleBookContext);
  console.log('bookSearchResults', bookSearchResults.length);

  return ( 
    <Layout style={styles.tab}>
      <Text category='h1' style={{ marginBottom: 16 }}>Buch-Liste</Text>
      <Input
        placeholder={'EIngabe tätigen'}
        value={bookSearchQuery}
        onChangeText={nextValue => setBookSearchQuery(nextValue)}
      />
      <BookList books={bookSearchResults} />
    </Layout>
  );
};

const styles = StyleSheet.create({
    tab: {
      padding: 20,
      paddingTop: 75,
      height: 800,
      flex: 1,
    },
});