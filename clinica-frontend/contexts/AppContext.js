import React, { createContext, useContext } from "react";
import useAuth from '../hooks/useAuth';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const auth = useAuth();

    return (
        <AppContext.Provider value={{ ...auth }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);