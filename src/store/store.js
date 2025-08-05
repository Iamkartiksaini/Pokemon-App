"use client";
import { createContext, useReducer, useContext } from "react";

const init = {
  allFilters: [],
  activeFilters: [],
  data: [],
  currentPage: 1,
};

const StoreContext = createContext(undefined);

function StoreProvider({ children }) {
  console.log("Context Updated");
  const [state, dispatch] = useReducer(reducer, init);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreValues() {
  return useContext(StoreContext);
}

export default StoreProvider;

function reducer(state, action) {
  return { ...action.cb(state) };
}
