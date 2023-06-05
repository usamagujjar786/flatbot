import { createContext, useState } from "react";
export const ProtectedContext: any = createContext<any | null>(null);
const ProtectedProvider = ({ children }: any) => {
    const [active, changeActive] = useState<number>(1)
    const setActive = (n: number): void => {
        changeActive(n);
    };

    return (
        <ProtectedContext.Provider value={{ active, setActive }}>
            {children}
        </ProtectedContext.Provider>
    );
}

export default ProtectedProvider;


