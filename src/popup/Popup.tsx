import { useContext, useEffect, useState } from 'react'
import './Popup.css'
import { AuthContext } from '../useContext/AuthContext'
import Public from '../pages/Public/Public'
import 'bootstrap/dist/css/bootstrap.min.css';
import PublicProvider from '../useContext/PublicContext'
import ProtectedProvider, { ProtectedContext } from '../useContext/ProtectedContext'
import Protected from '../pages/Protected/Protected'
import Home from '../pages/Protected/Home';
import MyALert from '../components/ALert';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import { url } from '../utils/url';
function App() {
  // const [crx, setCrx] = useState('create-chrome-ext')
  // async function fetchHTML(url: any) {
  //   try {
  //     const response = await fetch(url);
  //     const html = await response.text();
  //     return html;
  //   } catch (error) {
  //     console.error('Error fetching HTML:', error);
  //     return null;
  //   }
  // }
  // const myFun = () => {
  //   var queryInfo: any = {
  //     active: true,
  //     currentWindow: true
  //   };
  //   chrome.tabs.query(queryInfo, (tabs: any) => {
  //     var tab = tabs[0];
  //     var url = tab.url;
  //     fetchHTML(url)
  //       .then(html => {
  //         if (html) {
  //           const parser = new DOMParser();
  //           const doc = parser.parseFromString(html, 'text/html');
  //           const element = doc.getElementById('main');

  //           // Do operations on the element
  //           if (element) {
  //             // Manipulate the element
  //             console.log(element);
  //           } else {
  //             console.log('Element not found.');
  //           }
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error:', error);
  //       });
  //   });
  // }
  const { isAuthenticated, login, loading, setLoading } = useContext<{ isAuthenticated: boolean, loading: boolean, setLoading: any, login: any }>(AuthContext)
  const { setUser } = useContext<{ setUser: any }>(ProtectedContext)
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.getItem("flatbot")) {
        try {
          const res = await axios.get(`${url}/user/loaduser`, {
            headers: {
              token: localStorage.getItem('flatbot'),
            }
          })
          if (res.data.success) {
            setUser(res.data.data)
            setLoading(false)
            login()
          }
        } catch (error) {
          localStorage.removeItem('flatbot')
          setLoading(false)
        }
      } else {
        localStorage.removeItem('flatbot')
        setLoading(false)
      }
    }
    loadUser()
  }, [])
  return (
    <main>
      <div>
        {loading &&
          <ProgressBar animated now={100} />
        }
        {!loading &&
          <>
            <MyALert />
            {isAuthenticated ?
              <Protected />
              // <Home />
              :
              <Public />
            }
          </>
        }
      </div>
    </main>
  )
}

export default App
