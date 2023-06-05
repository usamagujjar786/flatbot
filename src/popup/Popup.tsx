import { useContext, useEffect, useState } from 'react'
import './Popup.css'
import { AuthContext } from '../useContext/AuthContext'
import Public from '../pages/Public/Public'
import 'bootstrap/dist/css/bootstrap.min.css';
import PublicProvider from '../useContext/PublicContext'
import ProtectedProvider from '../useContext/ProtectedContext'
import Protected from '../pages/Protected/Protected'
import Home from '../pages/Protected/Home';
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
  const { isAuthenticated } = useContext<{ isAuthenticated: boolean }>(AuthContext)
  return (
    <main>

      {/* <button onClick={() => naviagte('/')}>click</button> */}
      {isAuthenticated ?
        <Protected />
        // <Home />
        :
        <Public />
      }
    </main>
  )
}

export default App
