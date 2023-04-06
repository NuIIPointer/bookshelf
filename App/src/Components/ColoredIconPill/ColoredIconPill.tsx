import { Icon, Layout, useTheme } from '@ui-kitten/components';

const ColoredIconPill = ({
    backgroundColor = 'color-primary-500',
    color = 'color-basic-100',
    iconName = 'book',
    size = 12,
    padding = 5,
    outerStyle = {},
}: {
    backgroundColor?: string;
    color?: string;
    iconName?: string;
    size?: number;
    padding?: number;
    outerStyle?: { [x: string]: number | string }
}) => {
    const theme = useTheme();

    return (
        <Layout
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: size + padding * 2,
                width: size + padding * 2,
                backgroundColor: theme[backgroundColor] || backgroundColor,
                borderRadius: size / 2 + padding,
                ...outerStyle,
            }}>
            <Icon
                name={iconName}
                fill={theme[color] || color}
                style={{ height: size, width: size }}
            />
        </Layout>
    );
};

export default ColoredIconPill;
