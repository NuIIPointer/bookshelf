import {
    Text,
    Layout,
    Input,
    Button,
    Icon,
    useTheme,
    Spinner,
    useStyleSheet,
} from '@ui-kitten/components';
import React, { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import BarcodeScanner from '../../Components/BarcodeScanner/BarcodeScanner';
import BookList from '../../Components/BookShelf/BookShelf';
import KeyboardAvoidingComponents from '../../Components/KeyboardAvodingComponents';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';

export const SearchScreen = () => {
    const { bookSearchResults, bookSearchQuery, setBookSearchQuery, bookSearchLoading } =
        useContext(GoogleBookContext);
    const [inputValue, setInputValue] = useState(bookSearchQuery);
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const iconColor = theme['color-primary-500'];
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
            <Layout style={{ minHeight: 100, flex: 1, height: '100%' }}>{renderBookList}</Layout>
        );
    }, [bookSearchLoading, renderBookList, styles.spinnerWrapper]);

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView>
                <Layout style={styles.tab}>
                    <Text category="h1" style={styles.headline}>
                        Mein Buchladen
                    </Text>
                    {pageContent}
                </Layout>
            </ScrollView>
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
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    outerLayout: {
        backgroundColor: 'color-primary-500',
    },
    tab: {
        paddingHorizontal: 32,
        paddingBottom: 0,
        paddingTop: 24,
        flex: 1,
        backgroundColor: 'color-primary-500',
        height: 400,
    },
    headline: {
        fontSize: 50,
        marginBottom: 32,
    },
    spinnerWrapper: {
        width: '100%',
        flex: 1,
        minHeight: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 64,
    },
    inputWrapper: {
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderTopColor: 'color-primary-400',
        borderTopWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    input: {
        flex: 1,
        borderColor: 'color-basic-100',
        borderWidth: 2,
    },
    button: {
        paddingHorizontal: 4,
        paddingVertical: 9,
        zIndex: 100000,
        backgroundColor: 'color-basic-100',
    },
    icon: {
        height: 12,
        width: 12,
    },
});
