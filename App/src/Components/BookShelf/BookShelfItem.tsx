import { Layout, Text, Button, Icon, useTheme, useStyleSheet } from '@ui-kitten/components';
import React, { useContext, useMemo } from 'react';
import { StyleSheet, Image } from 'react-native';

import { GoogleBookContext, StoredBook, BookSearchResult } from '../../Context/GoogleBooks.Context';
import intArraySum from '../../Helper/intArraySum';
import useStoredPageRecentReadingValue from '../../Helper/useStoredPageRecentReadingValue';
import ProgressBar from '../ProgressBar/ProgressBar';

const BookListItem = ({
    item,
    onModalClick,
}: {
    item: StoredBook & BookSearchResult;
    onModalClick: Function;
}) => {
    const { readingList, toggleReadingList, bookmarkList, toggleBookmarkList } =
        useContext(GoogleBookContext);
    const theme = useTheme();
    const activeFillColor = theme['color-primary-500'];
    const inactiveFillColor = theme['color-basic-600'];
    const styles = useStyleSheet(themedStyles);

    const insideReadingList = !!readingList[item.id];
    const insideBookmarkList = !!bookmarkList[item.id];
    const thumbnail = item?.thumbnail || item?.volumeInfo?.imageLinks?.thumbnail || '';
    const title = item?.title || item?.volumeInfo?.title || '';
    const authors = item?.authors || item?.volumeInfo?.authors || [];
    const pages = item.volumeInfo?.pageCount || 0;

    const pagesRead = useStoredPageRecentReadingValue(item.id);

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
                {authors ? <Text style={styles.authors}>{authors.join(', ')}</Text> : null}
                {pages ? (
                    <>
                        <Layout style={styles.pagesWrapper}>
                            <Text style={styles.pagesText}>
                                {pagesRead} von {pages} Seiten gelesen
                            </Text>
                            <Button
                                onPress={() => onModalClick(item.id)}
                                style={styles.editPagesButton}
                                accessoryLeft={() => (
                                    <Icon
                                        name="edit"
                                        fill={inactiveFillColor}
                                        style={styles.icons}
                                    />
                                )}
                            />
                        </Layout>
                    </>
                ) : null}
            </Layout>
            <Layout style={styles.actionList}>
                <Button
                    onPress={() => toggleReadingList(item.id)}
                    style={styles.iconButton}
                    accessoryLeft={() => (
                        <Icon
                            name={`book-open${insideReadingList ? '' : '-outline'}`}
                            fill={insideReadingList ? activeFillColor : inactiveFillColor}
                            style={styles.icons}
                        />
                    )}
                />
                <Button
                    onPress={() => toggleBookmarkList(item.id)}
                    style={styles.iconButton}
                    accessoryLeft={() => (
                        <Icon
                            name={`bookmark${insideBookmarkList ? '' : '-outline'}`}
                            fill={insideBookmarkList ? activeFillColor : inactiveFillColor}
                            style={styles.icons}
                        />
                    )}
                />
            </Layout>
            <Layout style={styles.progressContainer}>
                {pages ? (
                    <ProgressBar
                        current={(pagesRead / pages) * 100}
                        outerStyle={{ borderWidth: 0, borderRadius: 2, backgroundColor: '#ddd' }}
                        innerStyle={{ height: 4 }}
                    />
                ) : null}
            </Layout>
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    bookContainer: {
        marginBottom: 16,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#fafafa',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 24,
        paddingTop: 24,
    },
    progressContainer: {
        width: '100%',
        marginTop: 16,
    },
    thumbnailWrapper: {
        marginLeft: -29,
        marginRight: 20,
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
        marginRight: 4,
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
    pagesWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 16,
        marginRight: 8,
        backgroundColor: 'transparent',
    },
    pagesText: {
        fontSize: 14,
    },
    pagesReadInput: {
        marginRight: 8,
        padding: 0,
        minWidth: 0,
        width: 40,
    },
    pagesReadInputText: {
        marginHorizontal: 0,
        paddingTop: 0,
        minHeight: 0,
        width: 40,
        textAlign: 'center',
    },
    iconButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 0,
        border: 'none',
        borderWidth: 0,
        borderColor: 'none',
        minHeight: 0,
        minWidth: 0,
    },
    icons: {
        width: 18,
        height: 18,
        margin: 0,
    },
    actionList: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        marginTop: -8,
        backgroundColor: 'transparent',
    },
    editPagesButton: {
        paddingHorizontal: 4,
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
});

export default BookListItem;
