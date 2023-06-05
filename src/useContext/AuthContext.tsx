import { FC, createContext, useState } from "react";
import { TodoContextType, ITodo } from '../@types/useContextHook';
export const AuthContext: any = createContext<any | null>(null);
const AuthProvider = ({ children }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const login = (): void => {
        setIsAuthenticated(true);
    };
    const logout = (): void => {
        setIsAuthenticated(false);
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;


