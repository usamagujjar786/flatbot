import { createContext, useState } from "react";
export const ProtectedContext: any = createContext<any | null>(null);
const ProtectedProvider = ({ children }: any) => {
  const [active, changeActive] = useState<number>(1)
  const [user, changeUser] = useState<any>()
  const setActive = (n: number): void => {
    changeActive(n);
  };
  const setUser = (n: any): void => {
    changeUser(n);
    console.log('user changed to', n)
  };
  const ShowProfile = (): void => {
    setActive(2)
  }

  return (
    <ProtectedContext.Provider value={{ active, setActive, ShowProfile, user, setUser }}>
      {children}
    </ProtectedContext.Provider>
  );
}

export default ProtectedProvider;


