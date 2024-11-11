// context/PageContext.js

import { createContext, useContext, useState } from 'react';

// Create a context to share the page number
const PageContext = createContext();

export const usePage = () => {
  return useContext(PageContext);
};

export const PageProvider = ({ children }) => {
  const [pageNumber, setPageNumber] = useState(1); // Default starting page

  return (
    <PageContext.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </PageContext.Provider>
  );
};
