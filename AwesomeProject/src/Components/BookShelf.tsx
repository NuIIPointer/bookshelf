import { Layout, Text, Button, Icon, useTheme } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Image } from 'react-native';

import { GoogleBookContext } from '../Context/GoogleBooks.Context';

const BookList = ({ books }) => {
    const { readingList, toggleReadingList, bookmarkList, toggleBookmarkList } =
        useContext(GoogleBookContext);
    const theme = useTheme();
    const activeFillColor = theme['color-primary-500'];

    const renderItem = ({ item }) => {
        const insideReadingList = !!readingList[item.id];
        const insideBookmarkList = !!bookmarkList[item.id];
        const thumbnail = item.thumbnail || item.volumeInfo?.imageLinks?.thumbnail;
        const title = item.title || item.volumeInfo?.title;
        const authors = item.authors || item.volumeInfo?.authors;

        return (
            <Layout style={styles.bookContainer}>
                {thumbnail && (
                    <Layout style={styles.thumbnailWrapper}>
                        <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
                    </Layout>
                )}
                <Layout style={styles.infoContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.authors}>{authors && authors.join(', ')}</Text>
                </Layout>
                <Layout style={styles.actionList}>
                    <Button
                        onPress={() => toggleReadingList(item.id)}
                        style={styles.iconButton}
                        accessoryLeft={
                            <Icon
                                name={`book-open${insideReadingList ? '' : '-outline'}`}
                                fill={insideReadingList ? activeFillColor : '#aaa'}
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
                                fill={insideBookmarkList ? activeFillColor : '#aaa'}
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
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        marginTop: 16,
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
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    authors: {
        fontSize: 14,
        color: '#777',
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
