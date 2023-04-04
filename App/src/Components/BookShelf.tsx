import { Layout, Text, Button, Icon, useTheme, useStyleSheet, Input } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';

import { GoogleBookContext, StoredBook, BookSearchResult } from '../Context/GoogleBooks.Context';

const BookList = ({ books }: { books: ArrayLike<StoredBook & BookSearchResult> }) => {
    const { readingList, toggleReadingList, bookmarkList, toggleBookmarkList, editStoredBook } =
        useContext(GoogleBookContext);
    const theme = useTheme();
    const activeFillColor = theme['color-primary-500'];
    const inactiveFillColor = theme['color-basic-600'];
    const styles = useStyleSheet(themedStyles);

    const renderItem = ({ item }: { item: StoredBook & BookSearchResult }) => {
        const insideReadingList = !!readingList[item.id];
        const insideBookmarkList = !!bookmarkList[item.id];
        const thumbnail = item?.thumbnail || item?.volumeInfo?.imageLinks?.thumbnail || '';
        const title = item?.title || item?.volumeInfo?.title || '';
        const authors = item?.authors || item?.volumeInfo?.authors || [];
        console.log('item', item);
        const pages = item.volumeInfo?.pageCount;
        const pagesRead = item.customData?.pagesRead || 0;

        return (
            <Layout style={styles.bookContainer}>
                {thumbnail && (
                    <Layout style={styles.thumbnailWrapper}>
                        {/* @ts-ignore: correct soruce structure */}
                        <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
                    </Layout>
                )}
                <Layout style={styles.infoContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {authors && <Text style={styles.authors}>{authors.join(', ')}</Text>}
                    {pages && (
                        <Text style={styles.pages}>
                            <Input
                                size='small'
                                style={styles.pagesReadInput}
                                textStyle={styles.pagesReadInputText}
                                value={pagesRead}
                                onChangeText={(nextValue: string) =>
                                    editStoredBook(item.id, {
                                        customData: {
                                            pagesRead: Math.min(parseInt(nextValue, 10), pages),
                                        },
                                    })
                                }
                            />
                            von {pages} Seiten gelesen
                        </Text>
                    )}
                </Layout>
                <Layout style={styles.actionList}>
                    <Button
                        onPress={() => toggleReadingList(item.id)}
                        style={styles.iconButton}
                        accessoryLeft={
                            <Icon
                                name={`book-open${insideReadingList ? '' : '-outline'}`}
                                fill={insideReadingList ? activeFillColor : inactiveFillColor}
                                style={styles.icons}
                            />
                        }
                    />
                    <Button
                        onPress={() => toggleBookmarkList(item.id)}
                        style={styles.iconButton}
                        accessoryLeft={
                            <Icon
                                name={`bookmark${insideBookmarkList ? '' : '-outline'}`}
                                fill={insideBookmarkList ? activeFillColor : inactiveFillColor}
                                style={styles.icons}
                            />
                        }
                    />
                </Layout>
            </Layout>
        );
    };

    return (
        <Layout style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                style={styles.bookList}
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
    bookContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 24,
        marginBottom: 16,
        padding: 20,
        paddingRight: 4,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#fafafa',
    },
    thumbnailWrapper: {
        marginLeft: -45,
        marginRight: 16,
        borderRadius: 6,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    thumbnail: {
        width: 80,
        height: 100,
    },
    infoContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    authors: {
        fontSize: 14,
        color: '#777',
        marginBottom: 16,
    },
    pages: {
        fontSize: 14,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
    },
    pagesReadInput: {
        marginRight: 8,
    },
    pagesReadInputText: {
        marginHorizontal: 0,
        paddingTop: 0,
        minHeight: 0,
        width: 40,
        textAlign: 'center',
    },
    iconButton: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: 'transparent',
        margin: 0,
        border: 'none',
        borderWidth: 0,
        borderColor: 'none',
        minHeight: 0,
        minWidth: 0,
        height: 30,
    },
    icons: {
        width: 12,
        height: 12,
        margin: 0,
    },
    actionList: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: -4,
        backgroundColor: 'transparent',
    },
});

export default BookList;
