import { createContext, useState } from "react";
import { TodoContextType, ITodo } from '../@types/useContextHook';
export const PublicContext: any = createContext<any | null>(null);
const PublicProvider = ({ children }: any) => {
  const [active, changeActive] = useState<number>(1)
  const setActive = (n: number): void => {
    changeActive(n);
  };

  return (
    <PublicContext.Provider value={{ active, setActive }}>
      {children}
    </PublicContext.Provider>
  );
}

export default PublicProvider;


