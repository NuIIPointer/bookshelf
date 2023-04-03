import { ViewPager } from '@ui-kitten/components';
import React, { useContext } from 'react';

import { HomeScreen } from './Pages/Home.Page';
import { ReadingListScreen } from './Pages/ReadingList.Page';
import { AppContext } from '../Context/App.Context';

const Pager = () => {
    const { pageIndex, setPageIndex } = useContext(AppContext);

    return (
        <ViewPager selectedIndex={pageIndex} onSelect={(index) => setPageIndex(index)}>
            <HomeScreen />
            <ReadingListScreen />
        </ViewPager>
    );
};

export default Pager;
