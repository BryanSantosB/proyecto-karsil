import { createContext, useContext } from "react";

const LayoutContext = createContext({ mode: "page" });

export const LayoutProvider = ({ mode = "page", children }) => (
  <LayoutContext.Provider value={{ mode }}>
    {children}
  </LayoutContext.Provider>
);

export const useLayout = () => useContext(LayoutContext);
