import { Text, Layout, Input, Button, Icon, useTheme } from '@ui-kitten/components';
import React, { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import BarcodeScanner from '../../Components/BarcodeScanner/BarcodeScanner';
import BookList from '../../Components/BookShelf/BookShelf';
import KeyboardAvoidingComponents from '../../Components/KeyboardAvodingComponents';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';

export const SearchScreen = () => {
    const { bookSearchResults, bookSearchQuery, setBookSearchQuery } =
        useContext(GoogleBookContext);
    const [inputValue, setInputValue] = useState(bookSearchQuery);
    const theme = useTheme();
    const iconColor = theme['text-alternate-color'];

    useEffect(() => {
        console.log('change bookSearchResults');
    }, [bookSearchResults]);

    const onPress = useCallback(() => {
        setBookSearchQuery(inputValue);
    }, [setBookSearchQuery, inputValue]);

    const renderBookList = useMemo(() => {
        return <BookList books={bookSearchResults} />;
    }, [bookSearchResults]);

    const renderBarcodeScanner = useMemo(() => {
        return <BarcodeScanner setCode={(data: string) => setInputValue(data)} />;
    }, []);

    return (
        <>
            <Layout style={styles.tab}>
                <Text category="h1">Buch-Liste</Text>
                {renderBookList}
            </Layout>
            <KeyboardAvoidingComponents>
                <Layout style={styles.inputWrapper}>
                    <Input
                        size="large"
                        style={styles.input}
                        placeholder="Eingabe tätigen"
                        value={inputValue}
                        onChangeText={(nextValue) => setInputValue(nextValue)}
                    />
                    <Button
                        onPress={onPress}
                        style={styles.button}
                        accessoryLeft={<Icon name="search" fill={iconColor} style={styles.icon} />}
                    />
                    {renderBarcodeScanner}
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
        zIndex: 100000,
    },
    icon: {
        height: 12,
        width: 12,
    },
});
