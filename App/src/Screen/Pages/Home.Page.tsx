import { Text, Layout, useStyleSheet } from '@ui-kitten/components';
import * as dateDFns from 'date-fns';
import React, { useContext, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';

import DashboardCard from '../../Components/DashboardCard/DashboardCard';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';
import intArraySum from '../../Helper/intArraySum';

export const HomeScreen = () => {
    const { storedBooks } = useContext(GoogleBookContext);
    const styles = useStyleSheet(themedStyles);

    const pagesReadTotalList = useMemo(
        () =>
            Object.keys(storedBooks).map((bookId) => {
                const pagesRead = storedBooks[bookId].customData?.pagesRead || {};
                const pagesReadValues = Object.keys(pagesRead)
                    .sort()
                    .map((key) => pagesRead[key]);

                return pagesReadValues[pagesReadValues.length - 1] || 0;
            }),
        [storedBooks]
    );
    const pagesReadTotal = useMemo(() => intArraySum(pagesReadTotalList), [pagesReadTotalList]);

    const pagesReadYearList = useMemo(
        () =>
            Object.keys(storedBooks).map((bookId) => {
                const pagesRead = storedBooks[bookId].customData?.pagesRead || {};
                const filteredKeys = Object.keys(pagesRead)
                    .filter((dateKey) => {
                        return dateDFns.isAfter(
                            new Date(dateKey),
                            dateDFns.startOfYear(new Date())
                        );
                    })
                    .sort();

                const mostRecentKey = filteredKeys[filteredKeys.length - 1];

                return pagesRead[mostRecentKey] || 0;
            }),
        [storedBooks]
    );
    const pagesReadYear = useMemo(() => intArraySum(pagesReadYearList), [pagesReadYearList]);

    const pagesReadMonthList = useMemo(
        () =>
            Object.keys(storedBooks).map((bookId) => {
                const pagesRead = storedBooks[bookId].customData?.pagesRead || {};
                const filteredKeys = Object.keys(pagesRead)
                    .filter((dateKey) => {
                        return dateDFns.isAfter(
                            new Date(dateKey),
                            dateDFns.startOfMonth(new Date())
                        );
                    })
                    .sort();

                const mostRecentKey = filteredKeys[filteredKeys.length - 1];

                return pagesRead[mostRecentKey] || 0;
            }),
        [storedBooks]
    );
    const pagesReadMonth = useMemo(() => intArraySum(pagesReadMonthList), [pagesReadMonthList]);

    const chartValues = useMemo(() => {
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

        return Object.keys(pagesReadPerDay).map((key) => pagesReadPerDay[key]);
    }, [storedBooks]);

    return (
        <>
            <Layout style={styles.tab}>
                <Text category="h1" style={{ marginBottom: 32 }}>
                    Meine Statistik
                </Text>
                <ScrollView style={styles.scrollView}>
                    <Layout style={styles.cardWrapper}>
                        <Layout style={styles.card}>
                            <DashboardCard
                                description="Seiten gelesen, gesammt!"
                                boldText={pagesReadTotal}
                            />
                        </Layout>
                        <Layout style={styles.card}>
                            <DashboardCard
                                description="Seiten gelesen, dieses Jahr!"
                                boldText={pagesReadYear}
                            />
                        </Layout>
                        <Layout style={styles.card}>
                            <DashboardCard
                                description="Seiten gelesen, diesen Monat!"
                                boldText={pagesReadMonth}
                            />
                        </Layout>
                        <Layout style={styles.card} />
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

const themedStyles = StyleSheet.create({
    scrollView: {
        padding: 16,
        margin: -16,
    },
    tab: {
        paddingHorizontal: 32,
        paddingTop: 24,
        paddingBottom: 0,
        flex: 1,
        backgroundColor: 'color-primary-500',
    },
    card: {
        flexBasis: '34%',
        flexGrow: 1,
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 32,
        backgroundColor: 'color-primary-500',
    },
});
