import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';

import BottomTabBar from './BottomTabBar';
import pagesIndex from './Pages';

const { Navigator, Screen } = createBottomTabNavigator();

const Pager = () => {
    const pagesNames = useMemo(() => Object.keys(pagesIndex), []);

    const screensMapped = useMemo(() => {
        return pagesNames.map((pageObj) => {
            return (
                <Screen name={pagesIndex[pageObj].name} component={pagesIndex[pageObj].component} />
            );
        });
    }, [pagesNames]);

    return (
        <Navigator
            screenOptions={() => ({
                freezeOnBlur: true,
                headerShown: false,
            })}
            tabBar={(props) => <BottomTabBar {...props} />}>
            {screensMapped}
        </Navigator>
    );
};

export default Pager;
