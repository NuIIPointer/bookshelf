import { Layout, Text, Button, Icon, useTheme, useStyleSheet } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { StyleSheet, Image, ImageBackground } from 'react-native';

import { GoogleBookContext, StoredBook, BookSearchResult } from '../../Context/GoogleBooks.Context';
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
    const inactiveFillColor = theme['color-basic-800'];
    const styles = useStyleSheet(themedStyles);

    const insideReadingList = !!readingList[item.id];
    const insideBookmarkList = !!bookmarkList[item.id];
    const thumbnail = item?.thumbnail || item?.volumeInfo?.imageLinks?.thumbnail || '';
    const title = item?.title || item?.volumeInfo?.title || '';
    const titleShortened = title.substring(0, 30);
    const authors = item?.authors || item?.volumeInfo?.authors || [];
    const pages = item.volumeInfo?.pageCount || 0;
    const pagesRead = useStoredPageRecentReadingValue(item.id);
    const pagesPercentage = Math.round((pagesRead / pages) * 100 || 0);

    return (
        <Layout style={styles.bookContainer}>
            {thumbnail && (
                <Layout style={styles.thumbnailWrapper}>
                    {/* @ts-ignore: correct soruce structure */}
                    <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
                </Layout>
            )}
            <Layout style={styles.contentWrap}>
                <ImageBackground
                    source={{ uri: thumbnail }}
                    resizeMode="cover"
                    style={styles.imageBackground}
                    blurRadius={30}
                />
                <Layout style={styles.infoContainer}>
                    <Text style={styles.title}>
                        {titleShortened}
                        {titleShortened !== title ? '...' : ''}
                    </Text>
                    {authors ? <Text style={styles.authors}>{authors.join(', ')}</Text> : null}
                    {pages ? (
                        <>
                            <Layout style={styles.pagesWrapper}>
                                <Text style={styles.pagesText}>
                                    {pagesRead} von {pages} Seiten gelesen | {pagesPercentage}%
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
                </Layout>
                <Layout style={styles.progressContainer}>
                    {pages ? (
                        <ProgressBar
                            current={(pagesRead / pages) * 100}
                            outerStyle={{
                                borderWidth: 0,
                                borderRadius: 2,
                                backgroundColor: '#ddd',
                            }}
                            innerStyle={{ height: 4 }}
                        />
                    ) : null}
                </Layout>
            </Layout>
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    bookContainer: {
        paddingLeft: 48,
    },
    contentWrap: {
        overflow: 'hidden',
        backgroundColor: 'white',
        marginBottom: 16,
        borderRadius: 16,
        borderColor: '#eee',
        borderWidth: 1,
    },
    imageBackground: {
        margin: -32,
        paddingHorizontal: 32,
        paddingTop: 48,
        position: 'absolute',
        height: '120%',
        width: '120%',
        opacity: 0.4,
    },
    progressContainer: {
        width: '100%',
    },
    thumbnailWrapper: {
        borderWidth: 2,
        borderColor: '#eee',
        zIndex: 1,
        marginTop: 24,
        position: 'absolute',
        top: 0,
        left: 0,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        borderRadius: 12,
    },
    thumbnail: {
        width: 150,
        height: 200,
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 40,
        paddingRight: 24,
        paddingLeft: 132,
        paddingBottom: 24,
        borderRadius: 6,
        minHeight: 244,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    authors: {
        fontSize: 14,
        color: 'black',
        marginBottom: 16,
    },
    pagesWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.25)',
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
        paddingHorizontal: 8,
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
        flexDirection: 'row',
        margin: 0,
        marginTop: 8,
        marginLeft: -12,
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
    },
});

export default BookListItem;
