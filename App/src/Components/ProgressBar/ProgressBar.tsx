import { Layout, useTheme } from '@ui-kitten/components';
import React from 'react';

const ProgressBar = ({
    current = 0,
    start = 0,
    end = 100,
    outerStyle,
    innerStyle,
}: {
    start?: number;
    end?: number;
    current: number;
    outerStyle?: { [x: string]: string | number };
    innerStyle?: { [x: string]: string | number };
}) => {
    const theme = useTheme();
    const percentageCalculated = Math.min((current / (start + end)) * 100, 100);

    return (
        <Layout
            style={{
                backgroundColor: 'transparent',
                width: '100%',
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                ...outerStyle,
            }}>
            <Layout
                style={{
                    width: `${percentageCalculated}%`,
                    height: 8,
                    backgroundColor: theme['color-primary-400'],
                    borderRadius: 4,
                    ...innerStyle,
                }}
            />
        </Layout>
    );
};

export default ProgressBar;
