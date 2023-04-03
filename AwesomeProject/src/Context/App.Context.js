import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <AppContext.Provider value={{ pageIndex: pageIndex, setPageIndex: setPageIndex }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
