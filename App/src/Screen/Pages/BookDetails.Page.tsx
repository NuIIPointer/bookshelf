import { useNavigation } from '@react-navigation/native';
import { Layout, Text, useStyleSheet, Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

export const BookDetails = () => {
    const styles = useStyleSheet(themedStyles);
    const navigation = useNavigation();

    return (
        <Layout style={{ flex: 1 }}>
            <Text category="h1" style={styles.headline}>
                Mein Bücherregal
            </Text>
            <Button
                title="Back"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    tab: {
        paddingHorizontal: 32,
        paddingBottom: 0,
        paddingTop: 24,
        flex: 1,
        backgroundColor: 'color-primary-500',
    },
    headline: {
        fontSize: 50,
        marginBottom: 32,
    },
});
