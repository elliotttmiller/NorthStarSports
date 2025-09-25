import React, { createContext, useContext } from "react";

const NavigationContext = createContext({});
export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Replace with real navigation logic
  return <NavigationContext.Provider value={{}}>{children}</NavigationContext.Provider>;
};
export const useNavigation = () => useContext(NavigationContext);
