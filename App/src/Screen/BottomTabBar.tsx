import {
    BottomNavigation,
    BottomNavigationTab,
    Icon,
    useStyleSheet,
    useTheme,
} from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

const RenderIcon = ({ icon, ...otherProps }: { icon: string }) => {
    const theme = useTheme();

    return <Icon fill={theme['color-shade-800']} name={icon} {...otherProps} />;
};

const BottomTabBar = ({ navigation, state }: { navigation: any; state: any }) => {
    const styles = useStyleSheet(themedStyles);

    return (
        <BottomNavigation
            style={styles.bottomNavigation}
            indicatorStyle={styles.indicator}
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={(props) => <RenderIcon {...props} icon="pie-chart" />} />
            <BottomNavigationTab icon={(props) => <RenderIcon {...props} icon="search" />} />
            <BottomNavigationTab icon={(props) => <RenderIcon {...props} icon="book" />} />
        </BottomNavigation>
    );
};

const themedStyles = StyleSheet.create({
    bottomNavigation: {
        paddingBottom: 32,
        paddingTop: 24,
        backgroundColor: 'color-basic-100',
    },
    indicator: {
        backgroundColor: 'color-secondary-300',
    },
});

export default BottomTabBar;
