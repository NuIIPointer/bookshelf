import { Layout, Text, useTheme } from '@ui-kitten/components';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import CustomCard from '../CustomCard/CustomCard';

const DashboardCard = ({
    description = 'foo',
    boldText,
    Icon = () => {},
}: {
    description: string;
    boldText: string | number;
    Icon?: Function;
}) => {
    const theme = useTheme();
    // const styles = useStyleSheet(themedStyles);
    const textColorMap = theme['color-shade-800'];
    const largeTextCharCount = boldText.toString().length;
    const fontSizeMap = [65, 65, 55, 40];
    const fontSize = fontSizeMap[largeTextCharCount - 1];

    return (
        <CustomCard ratio={1}>
            <Icon />
            {description ? (
                <Text style={{ ...styles.cardText, color: textColorMap }}>{description}</Text>
            ) : null}
            <Layout style={styles.cardTextWrap}>
                <Text
                    category="h1"
                    style={{
                        ...styles.largeText,
                        color: textColorMap,
                        fontSize,
                    }}>
                    {boldText}
                </Text>
            </Layout>
        </CustomCard>
    );
};

const styles = StyleSheet.create({
    cardOuter: {
        borderRadius: 16,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    largeText: {
        // fontSize: 60,
    },
    cardInner: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        padding: 16,
        aspectRatio: 1,
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '150%',
        width: '150%',
    },
    cardTextWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'transparent',
    },
    cardText: {
        backgroundColor: 'transparent',
        zIndex: 1,
        fontSize: 26,
        fontWeight: 300,
        textShadowRadius: 2,
        textShadowColor: 'white',
    },
});

export default DashboardCard;
