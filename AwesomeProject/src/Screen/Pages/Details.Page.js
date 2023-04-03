import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

export const DetailsScreen = () => {
  return (
    <Layout style={styles.tab}>
      <Text category='h1'>DETAILS</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
    tab: {
      height: 800,
      alignItems: 'center',
      justifyContent: 'center',
    },
});