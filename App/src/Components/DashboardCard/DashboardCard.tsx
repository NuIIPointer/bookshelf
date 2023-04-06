import { Card, Layout, Text } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

import ColoredIconPill from '../ColoredIconPill/ColoredIconPill';

const DashboardCard = ({
    description = 'foo',
    boldText,
    colorStart = 'lightblue',
    colorEnd = 'blue',
    textColor = 'white',
}: {
    description: string;
    boldText: string | number;
    colorStart?: string;
    colorEnd?: string;
    textColor?: string;
}) => {
    return (
        <Card style={styles.card}>
            <LinearGradient
                colors={[colorStart, colorEnd]}
                style={styles.linearGradient}
                start={[0.0, 0.0]}
                end={[1.0, 1.0]}
            />
            {description ? (
                <Text style={{ ...styles.cardText, color: textColor }}>{description}</Text>
            ) : null}
            <Layout style={styles.cardTextWrap}>
                <Text category="h1" style={{ color: textColor }}>
                    {boldText}
                </Text>
            </Layout>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 0,
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
        marginBottom: 4,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
});

export default DashboardCard;
