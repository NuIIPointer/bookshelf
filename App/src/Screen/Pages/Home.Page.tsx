import { Text, Layout, Card } from '@ui-kitten/components';
import * as dateDFns from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';

import { GoogleBookContext } from '../../Context/GoogleBooks.Context';
import intArraySum from '../../Helper/intArraySum';

export const HomeScreen = () => {
    const { storedBooks } = useContext(GoogleBookContext);

    const pagesReadTotalList = Object.keys(storedBooks).map((bookId) => {
        const pagesRead = storedBooks[bookId].customData?.pagesRead || {};
        const pagesReadValues = Object.keys(pagesRead)
            .sort()
            .map((key) => pagesRead[key]);

        return pagesReadValues[pagesReadValues.length - 1];
    });
    const pagesReadTotal = intArraySum(pagesReadTotalList);

    const pagesReadYearList = Object.keys(storedBooks).map((bookId) => {
        const pagesRead = storedBooks[bookId].customData?.pagesRead || {};
        const filteredKeys = Object.keys(pagesRead)
            .filter((dateKey) => {
                return dateDFns.isAfter(new Date(dateKey), dateDFns.startOfYear(new Date()));
            })
            .sort();

        const mostRecentKey = filteredKeys[filteredKeys.length - 1];

        return pagesRead[mostRecentKey];
    });
    const pagesReadYear = intArraySum(pagesReadYearList);

    const pagesReadMonthList = Object.keys(storedBooks).map((bookId) => {
        const pagesRead = storedBooks[bookId].customData?.pagesRead || {};
        const filteredKeys = Object.keys(pagesRead)
            .filter((dateKey) => {
                return dateDFns.isAfter(new Date(dateKey), dateDFns.startOfMonth(new Date()));
            })
            .sort();

        const mostRecentKey = filteredKeys[filteredKeys.length - 1];

        return pagesRead[mostRecentKey];
    });
    const pagesReadMonth = intArraySum(pagesReadMonthList);

    const pagesReadPerDay: { [x: string]: number } = {};
    Object.keys(storedBooks).forEach((bookId) => {
        const pagesRead = storedBooks[bookId].customData?.pagesRead || {};
        const filteredKeys = Object.keys(pagesRead)
            .filter((dateKey) => {
                return dateDFns.isAfter(new Date(dateKey), dateDFns.startOfMonth(new Date()));
            })
            .sort();

        filteredKeys.forEach((key: string) => {
            pagesReadPerDay[key] = (pagesReadPerDay[key] || 0) + pagesRead[key];
        });
    });
    const chartValues = Object.keys(pagesReadPerDay).map((key) => pagesReadPerDay[key]);

    return (
        <>
            <Layout style={styles.tab}>
                <Text category="h1" style={{ marginBottom: 16 }}>
                    Deine Statistik
                </Text>
                <ScrollView>
                    <Layout style={styles.cardWrapper}>
                        <Card style={styles.card}>
                            <Text style={styles.cardText}>Seiten gelesen, gesammt!</Text>
                            <Text category="h1">{pagesReadTotal}</Text>
                        </Card>
                        <Card style={styles.card}>
                            <Text style={styles.cardText}>Seiten gelesen, dieses Jahr!</Text>
                            <Text category="h1">{pagesReadYear}</Text>
                        </Card>
                        <Card style={styles.card}>
                            <Text style={styles.cardText}>Seiten gelesen, diesen Monat!</Text>
                            <Text category="h1">{pagesReadMonth}</Text>
                        </Card>
                        <Layout style={{ width: '100%' }}>
                            <LineChart
                                style={{ height: 200 }}
                                data={chartValues}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                                contentInset={{ top: 20, bottom: 20 }}>
                                <Grid />
                            </LineChart>
                        </Layout>
                    </Layout>
                </ScrollView>
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
    cardWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    card: {
        flexGrow: 1,
        flexBasis: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardText: {
        marginBottom: 4,
    },
});
