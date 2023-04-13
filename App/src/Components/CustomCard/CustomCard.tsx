import { Layout, useTheme } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const CustomCard = ({
    colorStart = 'color-basic-100',
    colorEnd = 'color-basic-100',
    borderColor = 'color-secondary-500',
    borderWidth = 0,
    radius = 16,
    ratio,
    children,
    padding = 16,
}: {
    colorStart?: string;
    colorEnd?: string;
    borderColor?: string;
    borderWidth?: number;
    radius?: number;
    ratio?: number;
    children?: any;
    padding?: number;
}) => {
    const theme = useTheme();
    // const styles = useStyleSheet(themedStyles);
    const colorStartMap = theme[colorStart] || colorStart;
    const colorEndMap = theme[colorEnd] || colorEnd;
    const borderColorMap = theme[borderColor] || borderColor;
    const radiusInner = radius - borderWidth;

    return (
        <Layout
            style={{
                ...styles.cardOuter,
                borderRadius: radius,
                borderWidth,
                borderColor: borderColorMap,
                backgroundColor: borderColorMap,
            }}>
            <Layout
                style={{
                    ...styles.cardInner,
                    aspectRatio: ratio,
                    borderRadius: radiusInner,
                    padding,
                }}>
                <LinearGradient
                    colors={[colorStartMap, colorEndMap]}
                    style={styles.linearGradient}
                    start={[0.0, 0.0]}
                    end={[1.0, 1.0]}
                />
                {children}
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    cardOuter: {
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
        overflow: 'hidden',
        backgroundColor: 'transparent',
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

export default CustomCard;
