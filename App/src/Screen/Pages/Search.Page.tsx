import { Text, Layout, Input, Button, Icon, useTheme } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import BookList from '../../Components/BookShelf/BookShelf';
import KeyboardAvoidingComponents from '../../Components/KeyboardAvodingComponents';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';

export const SearchScreen = () => {
    const { bookSearchResults, bookSearchQuery, setBookSearchQuery } =
        useContext(GoogleBookContext);
    const theme = useTheme();
    const iconColor = theme['text-alternate-color'];

    return (
        <>
            <Layout style={styles.tab}>
                <Text category="h1">Buch-Liste</Text>
                <BookList books={bookSearchResults} />
            </Layout>
            <KeyboardAvoidingComponents>
                <Layout style={styles.inputWrapper}>
                    <Input
                        style={styles.input}
                        placeholder="Eingabe tätigen"
                        value={bookSearchQuery}
                        onChangeText={(nextValue) => setBookSearchQuery(nextValue)}
                    />
                    <Button
                        style={styles.button}
                        accessoryLeft={<Icon name="search" fill={iconColor} style={styles.icon} />}
                    />
                </Layout>
            </KeyboardAvoidingComponents>
        </>
    );
};

const styles = StyleSheet.create({
    tab: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 0,
        flex: 1,
    },
    inputWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    input: {
        flex: 1,
    },
    button: {
        paddingHorizontal: 2,
        paddingVertical: 9,
    },
    icon: {
        height: 12,
        width: 12,
    },
});
