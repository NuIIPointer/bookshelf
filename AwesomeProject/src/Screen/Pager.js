import React, { useContext } from 'react';
import { ViewPager } from '@ui-kitten/components';
import { AppContext } from '../Context/App.Context';
import { HomeScreen } from './Pages/Home.Page';
import { DetailsScreen } from './Pages/Details.Page';

const Pager = () => {
    const { pageIndex, setPageIndex } = useContext(AppContext);

    return (
        <ViewPager
        selectedIndex={pageIndex}
        onSelect={index => setPageIndex(index)}>
            <HomeScreen />
            <DetailsScreen />
        </ViewPager>
    );
};

export default Pager;