import { Text, Layout, useStyleSheet, useTheme } from '@ui-kitten/components';
import * as shape from 'd3-shape';
import * as dateDFns from 'date-fns';
import Lottie from 'lottie-react-native';
import React, { useContext, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

import CustomCard from '../../Components/CustomCard/CustomCard';
import DashboardCard from '../../Components/DashboardCard/DashboardCard';
import { GoogleBookContext } from '../../Context/GoogleBooks.Context';
import intArraySum from '../../Helper/intArraySum';
import BookStack from '../../assets/icons/BookStack';
import Lamp from '../../assets/icons/Lamp';
import LeafFilled from '../../assets/icons/LeafFilled';
import lottieBookReading from '../../assets/lotties/JKDkJgwY8i.json';

export const HomeScreen = () => {
    const { storedBooks } = useContext(GoogleBookContext);
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();

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

    const chartValuesPerDay = useMemo(() => {
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

        return pagesReadPerDay;
    }, [storedBooks]);

    const chartLabels = Object.keys(chartValuesPerDay).map(key => ({value: key}));
    const chartValues = Object.keys(chartValuesPerDay).map((key) => chartValuesPerDay[key]);

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={styles.scrollView}>
                <Layout style={styles.tab}>
                    <Text category="h1" style={styles.headline}>
                        Meine Statistik
                    </Text>
                    <Layout style={styles.cardWrapper}>
                        <Layout style={styles.card}>
                            <DashboardCard
                                description="Gesamt"
                                boldText={pagesReadTotal}
                                Icon={() => (
                                    <LeafFilled
                                        fill={theme['color-secondary-300']}
                                        width={300}
                                        height={300}
                                        style={{ position: 'absolute', top: 50, right: 20 }}
                                    />
                                )}
                            />
                        </Layout>
                        <Layout style={styles.card}>
                            <DashboardCard
                                description="Jahr"
                                boldText={pagesReadYear}
                                Icon={() => (
                                    <BookStack
                                        fill={theme['color-secondary-300']}
                                        width={200}
                                        height={200}
                                        style={{ position: 'absolute', top: 10, left: 65 }}
                                    />
                                )}
                            />
                        </Layout>
                        <Layout style={styles.card}>
                            <DashboardCard
                                description="Monat"
                                boldText={pagesReadMonth}
                                Icon={() => (
                                    <Lamp
                                        fill={theme['color-secondary-300']}
                                        width={160}
                                        height={160}
                                        style={{ position: 'absolute', top: -5, left: -75 }}
                                    />
                                )}
                            />
                        </Layout>
                        <Layout style={styles.card}>
                            <Lottie source={lottieBookReading} autoPlay loop />
                        </Layout>
                        <Layout style={{ width: '100%' }}>
                            <CustomCard padding={0}>
                                <Layout
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        backgroundColor: 'transparent',
                                        padding: 24,
                                        paddingRight: 0,
                                    }}>
                                    <YAxis
                                        data={chartValues}
                                        // contentInset={contentInset}
                                        svg={{
                                            fill: theme['color-shade-700'],
                                            fontSize: 11,
                                            fontWeight: 700,
                                            marginBottom: 56,
                                        }}
                                        numberOfTicks={10}
                                        // formatLabel={(value) => `${value}ºC`}
                                    />
                                    <Layout
                                        style={{
                                            flexGrow: 1,
                                            backgroundColor: 'transparent',
                                            margin: 16,
                                            marginBottom: 0,
                                            marginRight: 0,
                                        }}>
                                        <Layout
                                            style={{
                                                overflow: 'hidden',
                                                width: '100%',
                                                backgroundColor: 'transparent',
                                            }}>
                                            <AreaChart
                                                style={{
                                                    height: 200,
                                                    marginHorizontal: -8,
                                                    marginBottom: -8,
                                                    flexGrow: 1,
                                                }}
                                                data={chartValues}
                                                svg={{
                                                    strokeWidth: 8,
                                                    stroke: theme['color-secondary-500'],
                                                    fill: theme['color-secondary-transparent-500'],
                                                }}
                                                curve={shape.curveMonotoneX}
                                                contentInset={{ top: 20, bottom: 20 }}>
                                                <Grid
                                                    svg={{
                                                        stroke: theme['color-secondary-300'],
                                                        // fill: theme['color-basic-transparent-300'],
                                                    }}
                                                />
                                            </AreaChart>
                                        </Layout>
                                        <XAxis
                                            style={{ marginHorizontal: -8, marginTop: 16 }}
                                            data={chartLabels}
                                            formatLabel={(value: number) =>
                                                dateDFns.format(
                                                    new Date(chartLabels[value].value),
                                                    'dd.MM.'
                                                )
                                            }
                                            contentInset={{ left: 10, right: 10 }}
                                            svg={{
                                                fontSize: 11,
                                                fontWeight: 700,
                                                fill: theme['color-shade-700'],
                                                height: 48,
                                            }}
                                        />
                                    </Layout>
                                </Layout>
                            </CustomCard>
                        </Layout>
                    </Layout>
                </Layout>
            </ScrollView>
        </Layout>
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
        marginBottom: 80,
    },
    headline: {
        fontSize: 50,
        marginBottom: 32,
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
