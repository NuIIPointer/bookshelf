import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ViewPager } from '@ui-kitten/components';
import React, { useContext } from 'react';

import { HomeScreen } from './Pages/Home.Page';
import { ReadingListScreen } from './Pages/ReadingList.Page';
import { AppContext } from '../Context/App.Context';
import BottomTabBar from './BottomTabBar';

const { Navigator, Screen } = createBottomTabNavigator();

const Pager = () => {
    // const { pageIndex, setPageIndex } = useContext(AppContext);

    return (
        <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Screen name="Home" component={HomeScreen} />
            <Screen name="ReadingList" component={ReadingListScreen} />
        </Navigator>
    );
};

export default Pager;
