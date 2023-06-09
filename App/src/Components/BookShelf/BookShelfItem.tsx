import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Layout, Text, Button, Icon, useTheme, useStyleSheet } from '@ui-kitten/components';
import React, { useContext } from 'react';
import { StyleSheet, Image } from 'react-native';

import { GoogleBookContext, StoredBook, BookSearchResult } from '../../Context/GoogleBooks.Context';
import useStoredPageRecentReadingValue from '../../Helper/useStoredPageRecentReadingValue';
import ProgressBar from '../ProgressBar/ProgressBar';
import pagesIndex from '../../Screen/Pages';

const BookListItem = ({
    item,
    onModalClick,
    variant,
}: {
    item: StoredBook & BookSearchResult;
    onModalClick: Function;
    variant: 'small' | 'large';
}) => {
    const { readingList, toggleReadingList, bookmarkList, toggleBookmarkList } =
        useContext(GoogleBookContext);
    const navigation = useNavigation();
    const theme = useTheme();
    const activeFillColor = theme['color-basic-100'];
    const inactiveFillColor = theme['color-basic-100'];
    const styles = useStyleSheet(themedStyles);

    const insideReadingList = !!readingList[item.id];
    const insideBookmarkList = !!bookmarkList[item.id];
    const thumbnail =
        item?.volumeInfo?.imageLinks?.extraLarge ||
        item?.volumeInfo?.imageLinks?.large ||
        item?.volumeInfo?.imageLinks?.medium ||
        item?.volumeInfo?.imageLinks?.thumbnail ||
        item?.thumbnail ||
        '';
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
                    <Image
                        style={{ ...styles.thumbnail, ...styles[`thumbnail${variant}`] }}
                        source={{ uri: thumbnail }}
                    />
                </Layout>
            )}
            <Layout style={styles.infoContainer}>
                <Text style={styles.title}>
                    {titleShortened}
                    {titleShortened !== title ? '...' : ''}
                </Text>
                {authors ? <Text style={styles.authors}>{authors.join(', ')}</Text> : null}
                <Layout style={styles.progressContainer}>
                    {pages ? (
                        <ProgressBar
                            current={(pagesRead / pages) * 100}
                            outerStyle={{
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: theme['color-primary-400'],
                            }}
                            innerStyle={{
                                height: 4,
                                backgroundColor: theme['color-basic-100'],
                            }}
                        />
                    ) : null}
                </Layout>
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
                <Button
                    onPress={() => {
                        navigation.navigate(pagesIndex.bookDetails.name);
                    }}>
                    Text
                </Button>
            </Layout>
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    bookContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 32,
    },
    progressContainer: {
        width: '100%',
    },
    thumbnailWrapper: {
        borderWidth: 4,
        borderColor: 'color-basic-100',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        borderRadius: 12,
    },
    thumbnail: {
        borderRadius: 10,
    },
    thumbnaillarge: {
        width: 150,
        height: 200,
    },
    thumbnailsmall: {
        width: 100,
        height: 133.33,
    },
    infoContainer: {
        flex: 1,
        padding: 24,
        paddingRight: 0,
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    authors: {
        fontSize: 14,
        color: 'color-primary-200',
        marginBottom: 16,
    },
    pagesWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 16,
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
