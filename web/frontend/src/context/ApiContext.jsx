import { createContext, useContext } from 'react';
import * as api from '../api/api';

const ApiContext = createContext();

export function ApiProvider({ children }) {
    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext);
}
