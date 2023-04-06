import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';

import AppContextProvider from './src/Context/App.Context';
import GoogleBooksContextProvider from './src/Context/GoogleBooks.Context';
import Pager from './src/Screen/Pager';
import TopNavigation from './src/Screen/TopNavigation';
import { customThemeDark } from './src/assets/styles/customThemeDark';

export default () => {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={customThemeDark}>
                <NavigationContainer>
                    <AppContextProvider>
                        <GoogleBooksContextProvider>
                            <TopNavigation />
                            <Pager />
                            {/* <BottomTabBar /> */}
                        </GoogleBooksContextProvider>
                    </AppContextProvider>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    );
};
