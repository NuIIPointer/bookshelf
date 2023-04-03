import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import React, { useState } from 'react';
// import { AppContext } from '../Context/App.Context';

export const BottomTabBar = () => {
    // const { pageIndex, setPageIndex } = useContext(AppContext);

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}>
            <BottomNavigationTab title="USERS" />
            <BottomNavigationTab title="ORDERS" />
        </BottomNavigation>
    );
};
