'use client'

import { createContext, useContext, useState, useCallback } from 'react';

const PageContext = createContext({
  pageNumber: 1,
  setPageNumber: () => {},
});

export const usePage = () => {
  return useContext(PageContext);
};

export const PageProvider = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const setPage = useCallback((page) => {
    setPageNumber(page);
  }, []);

  return (
    <PageContext.Provider value={{ pageNumber, setPageNumber: setPage }}>
      {children}
    </PageContext.Provider>
  );
};