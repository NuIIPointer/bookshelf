import { Card, Layout, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const DashboardCard = ({
    description = 'foo',
    boldText,
    colorStart = 'color-basic-100',
    colorEnd = 'color-basic-100',
    textColor = 'color-secondary-500',
    borderColor = 'color-secondary-500',
    borderWidth = 0,
}: {
    description: string;
    boldText: string | number;
    colorStart?: string;
    colorEnd?: string;
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
}) => {
    const theme = useTheme();
    // const styles = useStyleSheet(themedStyles);
    const colorStartMap = theme[colorStart] || colorStart;
    const colorEndMap = theme[colorEnd] || colorEnd;
    const textColorMap = theme[textColor] || textColor;
    const largeTextCharCount = boldText.toString().length;
    const fontSizeMap = [65, 65, 55, 40];
    const fontSize = fontSizeMap[largeTextCharCount - 1];
    const borderColorMap = theme[borderColor] || borderColor;

    return (
        <Layout
            style={{
                ...styles.cardOuter,
                borderWidth,
                borderColor: borderColorMap,
                backgroundColor: borderColorMap,
            }}>
            <Layout style={styles.cardInner}>
                <LinearGradient
                    colors={[colorStartMap, colorEndMap]}
                    style={styles.linearGradient}
                    start={[0.0, 0.0]}
                    end={[1.0, 1.0]}
                />
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
            </Layout>
        </Layout>
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
    },
});

export default DashboardCard;
