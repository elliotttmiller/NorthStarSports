import React, { createContext, useContext } from "react";

export interface User {
  name?: string;
  email?: string;
}

const UserContext = createContext<{ user?: User }>({});
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Replace with real user logic
  const user = { name: "Guest User", email: "Welcome" };
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
