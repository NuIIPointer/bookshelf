import React, { createContext, useRef, useState } from 'react';

export const AppContext = createContext<{
    pageIndex: number;
    setPageIndex: Function;
    topNavigationHeight: { current: number | null };
}>({
    pageIndex: 0,
    setPageIndex: () => {},
    topNavigationHeight: { current: null },
});

type AppContextProviderTypes = {
    children: React.ReactNode | string;
};

const AppContextProvider = ({ children }: AppContextProviderTypes) => {
    const [pageIndex, setPageIndex] = useState<number>(0);
    const topNavigationHeight = useRef<number>(0);

    return (
        <AppContext.Provider value={{ pageIndex, setPageIndex, topNavigationHeight }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
