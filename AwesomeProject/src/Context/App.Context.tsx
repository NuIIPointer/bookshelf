import React, { createContext, useState } from 'react';

export const AppContext = createContext<{ pageIndex: number; setPageIndex: Function }>({
    pageIndex: 0,
    setPageIndex: () => {},
});

type AppContextProviderTypes = {
    children: React.ReactNode | string;
};

const AppContextProvider = ({ children }: AppContextProviderTypes) => {
    const [pageIndex, setPageIndex] = useState<number>(0);

    return (
        <AppContext.Provider value={{ pageIndex, setPageIndex }}>{children}</AppContext.Provider>
    );
};

export default AppContextProvider;
