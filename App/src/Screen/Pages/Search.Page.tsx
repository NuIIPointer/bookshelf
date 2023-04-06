import { Text, Layout, Input, Button, Icon, useTheme, Spinner } from '@ui-kitten/components';
import React, { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import BarcodeScanner from '../../Components/BarcodeScanner/BarcodeScanner';
import BookList from '../../Components/BookShelf/BookShelf';
import KeyboardAvoidingComponents from '../../Components/KeyboardAvodingComponents';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';

export const SearchScreen = () => {
    const { bookSearchResults, bookSearchQuery, setBookSearchQuery, bookSearchLoading } =
        useContext(GoogleBookContext);
    const [inputValue, setInputValue] = useState(bookSearchQuery);
    const theme = useTheme();
    const iconColor = theme['text-alternate-color'];
    const onPress = useCallback(() => {
        setBookSearchQuery(inputValue);
    }, [setBookSearchQuery, inputValue]);

    const renderBookList = useMemo(() => {
        return <BookList books={bookSearchResults} />;
    }, [bookSearchResults]);

    const renderBarcodeScanner = useMemo(() => {
        return <BarcodeScanner setCode={(data: string) => setInputValue(data)} />;
    }, []);

    const pageContent = useMemo(() => {
        return bookSearchLoading ? (
            <Layout style={styles.spinnerWrapper}>
                <Spinner size="giant" />
            </Layout>
        ) : (
            renderBookList
        );
    }, [bookSearchLoading, renderBookList]);

    return (
        <>
            <Layout style={styles.tab}>
                <Text category="h1">Bücher suchen</Text>
                {pageContent}
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
                        disabled={bookSearchLoading}
                        style={styles.button}
                        accessoryLeft={
                            <Icon
                                name={bookSearchLoading ? 'clock-outline' : 'search'}
                                fill={iconColor}
                                style={styles.icon}
                            />
                        }
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
        paddingBottom: 0,
        paddingTop: 24,
        flex: 1,
    },
    spinnerWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 64,
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
