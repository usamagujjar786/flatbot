import { useContext, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { AlertContext } from '../useContext/AlertContext';
import './alert.css'
function MyALert() {
  const { alertList, removeAlert } = useContext<{ alertList: { msg: string, type: string, id: string }[], removeAlert: any }>(AlertContext)

  return (
    <>
      <div className='mainALert'>
        {
          alertList.map((item: { msg: string, type: string, id: string }) =>
          (
            <Alert variant={item.type}>
              {item.msg}
              <p className="close" onClick={() => removeAlert(item.id)}>X</p>
            </Alert>
          )
          )
        }
      </div>

    </>
  );
}

export default MyALert;