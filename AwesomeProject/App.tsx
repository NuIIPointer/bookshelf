import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';

// import BottomTabBar from './src/Screen/BottomTabBar';
import AppContextProvider from './src/Context/App.Context';
import GoogleBooksContextProvider from './src/Context/GoogleBooks.Context';
import Pager from './src/Screen/Pager';

export default () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <AppContextProvider>
                <GoogleBooksContextProvider>
                    <Pager />
                    {/* <BottomTabBar /> */}
                </GoogleBooksContextProvider>
            </AppContextProvider>
        </ApplicationProvider>
    </>
);
