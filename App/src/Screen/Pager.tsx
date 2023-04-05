import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';
import React from 'react';

import BottomTabBar from './BottomTabBar';
import { HomeScreen } from './Pages/Home.Page';
import { ReadingListScreen } from './Pages/ReadingList.Page';
import { SearchScreen } from './Pages/Search.Page';

const { Navigator, Screen } = createBottomTabNavigator();

const Pager = () => {
    return (
        <Navigator
            screenOptions={() => ({
                freezeOnBlur: true,
            })}
            tabBar={(props) => <BottomTabBar {...props} />}>
            <Screen name="Home" component={HomeScreen} />
            <Screen name="Suche" component={SearchScreen} />
            <Screen name="Leseliste" component={ReadingListScreen} />
        </Navigator>
    );
};

export default Pager;
