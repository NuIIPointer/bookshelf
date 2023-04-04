import { Text, Layout, Input, Button, Icon, useTheme, Card } from '@ui-kitten/components';
import * as dateDFns from 'date-fns';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { GoogleBookContext } from '../../Context/GoogleBooks.Context';

export const HomeScreen = () => {
    const { storedBooks } = useContext(GoogleBookContext);
    const theme = useTheme();

    const pagesReadTotalList = Object.keys(storedBooks).map((bookId) => {
        return storedBooks[bookId].customData?.pagesRead;
    });
    const pagesReadTotal =
        pagesReadTotalList.length > 0
            ? pagesReadTotalList.reduce((a: number, b: number) => {
                  return (a || 0) + (b || 0);
              })
            : 0;

    const pagesReadYearList = Object.keys(storedBooks).map((bookId) => {
        const creationDate = storedBooks[bookId].customData?.creationDate;

        if (creationDate && dateDFns.isAfter(creationDate, dateDFns.startOfYear(new Date()))) {
            return storedBooks[bookId].customData?.pagesRead || 0;
        }

        return 0;
    });
    const pagesReadYear =
        pagesReadYearList.length > 0
            ? pagesReadYearList.reduce((a: number, b: number) => {
                  return a + b;
              })
            : 0;

    const pagesReadMonthList = Object.keys(storedBooks).map((bookId) => {
        const creationDate = storedBooks[bookId].customData?.creationDate;

        if (creationDate && dateDFns.isAfter(creationDate, dateDFns.startOfMonth(new Date()))) {
            return storedBooks[bookId].customData?.pagesRead || 0;
        }

        return 0;
    });
    const pagesReadMonth =
        pagesReadMonthList.length > 0
            ? pagesReadMonthList.reduce((a: number, b: number) => {
                    return a + b;
                })
            : 0;

    return (
        <>
            <Layout style={styles.tab}>
                <Text category="h1" style={{ marginBottom: 16 }}>
                    Deine Statistik
                </Text>
                <Card style={styles.card}>
                    <Text>Seiten gelesen, gesammt!</Text>
                    <Text category="h1">{pagesReadTotal}</Text>
                </Card>
                <Card style={styles.card}>
                    <Text>Seiten gelesen, dieses Jahr!</Text>
                    <Text category="h1">{pagesReadYear}</Text>
                </Card>
                <Card style={styles.card}>
                    <Text>Seiten gelesen, diesen Monat!</Text>
                    <Text category="h1">{pagesReadMonth}</Text>
                </Card>
            </Layout>
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
    card: {
        marginBottom: 16,
    },
});
