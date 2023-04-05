import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

const RenderIcon = ({ icon, ...otherProps }: { icon: string }) => {
    return <Icon name={icon} {...otherProps} />;
};

const BottomTabBar = ({ navigation, state }: { navigation: any; state: any }) => {
    return (
        <BottomNavigation
            style={styles.bottomNavigation}
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={(props) => <RenderIcon {...props} icon="pie-chart" />} />
            <BottomNavigationTab icon={(props) => <RenderIcon {...props} icon="search" />} />
            <BottomNavigationTab icon={(props) => <RenderIcon {...props} icon="book" />} />
        </BottomNavigation>
    );
};

const styles = StyleSheet.create({
    bottomNavigation: {
        paddingBottom: 32,
        paddingTop: 16,
    },
});

export default BottomTabBar;
