import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { HomeScreen } from './Pages/Home.Page';
import { SearchScreen } from './Pages/Search.Page';
import { ReadingListScreen } from './Pages/ReadingList.Page';
import BottomTabBar from './BottomTabBar';

const { Navigator, Screen } = createBottomTabNavigator();

const Pager = () => {
    // const { pageIndex, setPageIndex } = useContext(AppContext);

    return (
        <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Screen name="Home" component={HomeScreen} />
            <Screen name="Suche" component={SearchScreen} />
            <Screen name="Leseliste" component={ReadingListScreen} />
        </Navigator>
    );
};

export default Pager;
