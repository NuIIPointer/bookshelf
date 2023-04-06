import {
    Layout,
    useStyleSheet,
    Text,
    Modal,
    Card,
    Input,
    Button,
    Icon,
} from '@ui-kitten/components';
import Lottie from 'lottie-react-native';
import React, { useState, useMemo, useContext, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import BookListItem from './BookShelfItem';
import { StoredBook, BookSearchResult, GoogleBookContext } from '../../Context/GoogleBooks.Context';
import lottieReading from '../../assets/lotties/107918-reading-writing-studying-knowledge-books.json';

const BookList = ({ books }: { books: ArrayLike<StoredBook & BookSearchResult> }) => {
    const styles = useStyleSheet(themedStyles);
    const [openModalBookId, setOpenModalBookId] = useState<string | null>(null);
    const { storedBooks, addPagesReadToBook } = useContext(GoogleBookContext);
    const book: StoredBook | null = openModalBookId ? storedBooks[openModalBookId] : null;

    const pagesRead = useMemo(() => {
        const keys = Object.keys(book?.customData?.pagesRead || {});
        const lastKey = keys[keys.length - 1];
        const lastValue = book?.customData?.pagesRead?.[lastKey] || 0;
        return lastValue;
    }, [book]);

    const [pagesInputValue, setPagesInputValue] = useState<string>(pagesRead.toString());

    useEffect(() => {
        setPagesInputValue(pagesRead.toString());
    }, [pagesRead]);

    const onInputSubmit = useCallback(
        (value: string) => {
            value && addPagesReadToBook(openModalBookId, Math.min(parseInt(value, 10)));
        },
        [addPagesReadToBook, openModalBookId]
    );

    const closeModal = useCallback(() => {
        onInputSubmit(pagesInputValue);
        setOpenModalBookId(null);
    }, [onInputSubmit, pagesInputValue]);

    const renderModal = useMemo(() => {
        const bookTitle = book?.volumeInfo?.title || '';

        return (
            <Modal
                visible={!!openModalBookId}
                onBackdropPress={closeModal}
                backdropStyle={styles.modalBackdrop}>
                <Card>
                    <Text category="h5" style={styles.pagesModalHeadline}>
                        Neue Seitenzahl
                    </Text>
                    <Text style={styles.pagesModalText}>{bookTitle}</Text>
                    <Layout style={styles.pagesModalInput}>
                        <Input
                            size="large"
                            value={pagesInputValue}
                            style={styles.pagesInput}
                            onChangeText={(nextValue: string) => {
                                setPagesInputValue(nextValue);
                            }}
                        />
                        <Button
                            size="large"
                            accessoryLeft={() => (
                                <Icon
                                    name="checkmark"
                                    fill="#fff"
                                    style={styles.pagesModalButtonIcon}
                                />
                            )}
                            onPress={closeModal}
                        />
                    </Layout>
                </Card>
            </Modal>
        );
    }, [book?.volumeInfo?.title, openModalBookId, closeModal, styles, pagesInputValue]);

    const onModalClick = useCallback((bookId: string) => {
        setOpenModalBookId(bookId);
    }, []);

    const renderList = useMemo(() => {
        if (books.length === 0) {
            return <Lottie source={lottieReading} autoPlay loop />;
        }

        return books.map((singleBook: StoredBook & BookSearchResult) => (
            <BookListItem item={singleBook} key={singleBook.id} onModalClick={onModalClick} />
        ));
    }, [books, onModalClick]);

    return (
        <Layout style={styles.container}>
            {renderList}
            {renderModal}
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        paddingBottom: 0,
    },
    listContainer: {
        // marginTop: 16,
    },
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    pagesModalHeadline: {
        marginBottom: 4,
    },
    pagesModalText: {
        marginBottom: 16,
    },
    pagesModalInput: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    pagesModalButtonIcon: {
        height: 16,
        width: 16,
        margin: -2,
    },
    pagesInput: {
        flex: 1,
    },
});

export default BookList;
