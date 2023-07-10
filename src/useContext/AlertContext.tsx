import { createContext, useState } from "react";
export const AlertContext: any = createContext<any | null>(null);
const AlertProvider = ({ children }: any) => {
  const [show, changeShow] = useState<boolean>(false)
  const [inProcess, changeInProcess] = useState<boolean>(false)
  const [alertList, changeAlertList] = useState<{ msg: string, type: string, id: string }[]>([])
  const setShow = (s: boolean): void => {
    changeShow(s);
  };
  const setInProcess = (value: boolean): void => {
    changeInProcess(value)
  }
  const removeAlert = (id: string): any => {
    changeAlertList((prev) => prev.filter((a: { id: string, msg: string, type: string }) => a.id != id))

  }
  const setAlertList = (item: { id: string, msg: string, type: string }): void => {
    changeAlertList((prev: any) => [...prev, item])
    setTimeout(() => {
      changeAlertList((prev) => prev.filter((a: { id: string, msg: string, type: string }) => a.id != item.id))
    }, 5000);
  }
  return (
    <AlertContext.Provider value={{ show, setShow, setAlertList, alertList, removeAlert, inProcess, setInProcess }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;


