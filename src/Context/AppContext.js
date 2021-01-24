import React, { createContext, useState } from "react";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const [Books, setBooks] = useState([]);
  const [SelectedBooks, setSelectedBooks] = useState([]);
  const [DBooks, setDBooks] = useState([]);
  return (
    <AppContext.Provider
      value={{
        SelectedBooks,
        setSelectedBooks,
        Books,
        setBooks,
        DBooks,
        setDBooks,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
