import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import React from 'react';

const BottomTabBar = ({ navigation, state }: { navigation: any; state: any }) => {
    return (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab title="Home" />
            <BottomNavigationTab title="ReadingList" />
        </BottomNavigation>
    );
};

export default BottomTabBar;
