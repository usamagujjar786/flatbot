import { useContext, useEffect, useState } from 'react';
import '../../popup/Popup.css'
import './styles/home.css'
import Button from 'react-bootstrap/Button';
import { Alert, ProgressBar, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { AlertContext } from '../../useContext/AlertContext';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import LimitReached from './comp/homeComp/limitReached';
import Footer from './comp/footer';
import { ProtectedContext } from '../../useContext/ProtectedContext';
import { scratch_data } from '../../utils/helper';
import { url as URL, url } from '../../utils/url';
const Home = () => {
  // const [url, setUrl] = useState<string>('')
  const { user, setUser } = useContext<{ user: any, setUser: any }>(ProtectedContext)
  const [id, setId] = useState<string>('id')
  const [activeTab, setActiveTab] = useState<string>('')
  const [msg, setMsg] = useState<string>('')
  const [germanMsg, setGermanMsg] = useState<string>('')
  const [englishMsg, setEnglishMsg] = useState<string>('')
  const [inProcess, setInProcess] = useState<boolean>(false)
  const [msgAlert, setMsgAlert] = useState<boolean>(false)
  const [msgInProcess, setMsgInProcess] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(user.auto_generate)
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('English')
  const [limit, setLimit] = useState<number>(1)
  const change_auto_generate = async (e: any) => {
    e.preventDefault()
    const res = await axios.post(`${url}/user/update_auto_generate`, { auto_generate: !checked }, {
      headers: {
        token: localStorage.getItem('flatbot')
      }
    })
    if (res.data.success) {
      setChecked(prev => !prev)
      if (!checked && !msg && id) {
        getMsg(id)
      }
    }
  }
  const copy = () => {
    navigator.clipboard.writeText(language === "English" ? englishMsg : germanMsg)
    setMsgAlert(true)
  }
  async function fetchHTML(url: any) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      return html;
    } catch (error) {
      console.error('Error fetching HTML:', error);
      return null;
    }
  }
  const validateURL = (url: string): boolean => {
    const myWebsite = "https://www.wg-gesucht.de/"
    if (!url.includes(myWebsite)) {
      return false
    } else {
      return true
    }
  }
  var queryInfo: any = {
    active: true,
    currentWindow: true
  };

  const myFun = async (url: string) => {
    if (!user.unlimited && user.limit >= 20) {
      setLoading(false)
    } else {
      let validate = validateURL(url)
      if (validate) {
        let regex = new RegExp(/https:\/\/www.wg-gesucht.de\/((\w*)(-))*(\w*)\.(\d*)\.html/g)
        const active = regex.test(url)
        console.log(`match result of ${url}`, active)
        if (active) {
          fetchHTML(url)
            .then(async (html) => {
              if (html) {
                const data: any = await scratch_data(html, url)
                console.log("data, ", data)
                try {
                  const res = await axios.post(`${URL}/user/save_listing`, { data }, {
                    headers: {
                      token: localStorage.getItem('flatbot'),
                    }
                  });
                  if (res.data.success) {
                    console.log(res.data.id)
                    setId(res.data.id)

                    if (user.auto_generate) {
                      setMsgInProcess(true)
                      getMsg(res.data.id)
                      setLoading(false)
                    } else {
                      setLoading(false)
                    }
                  }
                  console.log(res.data)
                } catch (error: any) {
                  setError((prev: any) => [...prev, error.response.data.message]);
                }
              }
            })
            .catch(error => {
              console.log(error)
            });
        } else {
          setError((prev: any) => [...prev, 'Make sure you are visiting an active listing page']);
          setLoading(false)
        }
      } else {
        setError((prev: any) => [...prev, "You're currently not on WG.GESUCHT"]);
        setLoading(false)
      }
    }
  }
  const getMsg = async (id: string) => {
    setMsgInProcess(true)
    try {
      const res = await axios.post(`${url}/user/generate_msg`, { id }, {
        headers: {
          token: localStorage.getItem('flatbot')
        }
      })
      console.log('generate_msg_api, ', res.data)
      setMsg(res.data.msg)
      setGermanMsg(res.data.msg.split('English:')[0].replace('German:', '').trim())
      setEnglishMsg(res.data.msg.split('English:')[1].trim())
      setMsgInProcess(false)
      if (!user.unlimited) {
        user.limit = user.limit + 1
      }
    } catch (error) {
      console.log(error)
      setMsgInProcess(false)
    }


    // setInProcess(true)
    // try {
    //   const res = await axios.post('https://ca4b-2003-e9-ff26-de9-f9e3-5a2d-eef5-b7bd.ngrok-free.app/api/v1/messages', { listing_id: id }, {
    //     headers: {
    //       access_token: localStorage.getItem('flatbot_access-token'),
    //       client: localStorage.getItem('flatbot_client'),
    //       uid: localStorage.getItem('flatbot_uid')
    //     }
    //   })
    //   if (res.status === 201 || res.status === 200) {
    //     setGermanMsg(res.data.content.split(`English message:`)[0]?.replace('German message:', '').trim())
    //     setEnglishMsg(res.data.content.split(`English message:`)[1].trim())
    //     setInProcess(false)
    //   }
    // } catch (error: any) {
    //   if (typeof error.response.data.alert === "object") {
    //     error.response.data.alert.map((item: string): void => {
    //       setError((prev: any) => [...prev, item]);
    //     })
    //     setInProcess(false)
    //   } else {
    //     setError((prev: any) => [...prev, error.response.data.alert]);
    //     setInProcess(false)
    //   }
    // }
  }
  useEffect(() => {
    chrome.tabs.query(queryInfo, (tabs: any) => {
      var tab = tabs[0];
      setActiveTab(tab.url)
      myFun(tab.url)
    })
  }, [])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string[]>([])
  const { setAlertList } = useContext<{ setAlertList: any, }>(AlertContext)
  const gotoWG = () => {
    console.log("gotoURL")
    chrome.tabs.create({ url: 'https://www.wg-gesucht.de/' });
  }
  useEffect(() => { console.log(user.limit, user.unlimited) }, [])
  return (
    <>
      <main className='home'>
        {loading &&
          <ProgressBar animated now={100} />
        }
        {!loading &&
          <>
            {msgAlert &&
              <Alert variant='success' className='msg-alert'>
                <p>Message Copied</p>
                <p className='close' onClick={() => { setMsgAlert(false) }}>X</p>
              </Alert>}
            {(user.limit < 20 || user.unlimited) &&
              <>
                {error.length > 0 ?
                  <div className="errors">
                    <div className='generate_msg_div'>
                      {error.map((item, index) => (
                        <p className='top_text'>{index + 1}. {item}</p>
                      ))}
                      <button className='goto_generate_msg' onClick={() => gotoWG()}>
                        {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <span className='register_button'>Go to a listing on WG-Gesucht to generate your message<img src="img/go.png" className='stars' /></span>}
                      </button>
                    </div>
                  </div>
                  :
                  <>
                    {id && <>
                      {germanMsg && englishMsg && msg && !inProcess && !msgInProcess &&
                        <div className='msg'>
                          <h5>🎉 Your message</h5>
                          <textarea value={language === "English" ? englishMsg : germanMsg} rows={7} readOnly />
                        </div>
                      }
                      {!msg && error.length === 0 && !msgInProcess &&
                        <div className='generate_msg_div'>
                          <p className='top_text'>Generate your message for this listing!</p>
                          <button className='generate_msg' onClick={() => getMsg(id)} disabled={inProcess}>
                            {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <span className='register_button'>Click to generate msg<img src="img/christmas-stars.png" className='stars' /></span>}
                          </button>
                        </div>
                      }
                      {!msg && error.length === 0 && msgInProcess &&
                        <div className='generate_msg_div'>
                          <div className='msg_in_process_top_div'>
                            <p className='top_text'>Your message is generating...</p>
                            <p className='right'>this usually takes 30 sec</p>
                          </div>
                          <div className='in_process_div'>
                            <ProgressBar animated now={100} />
                          </div>
                        </div>
                      }
                    </>}


                    <div className='footer_top'>
                      <div className='buttons'>
                        <div className='switch_language' onClick={() => setDropdown(prev => !prev)}>
                          <p>Generate in <span className='language'>{language}</span></p>
                          <img src='img/vector_small.png' />
                          {dropdown ?
                            <div className='dropdown'>
                              <p onClick={() => setLanguage('English')}>English</p>
                              <hr />
                              <p onClick={() => setLanguage('German')}>German</p>
                            </div>
                            :
                            <></>
                          }
                        </div>
                        <div className='copy'>
                          <button disabled={!msg} onClick={() => { copy() }}>
                            {!msg ? <p className='disabled'>Copy</p> : <p className='active'> Copy </p>}
                            {!msg ? <img src='img/copy_disabled.png' /> : <img src='img/copy.png' />}
                          </button>
                        </div>
                      </div>
                      <div className='autogenerate'>
                        <Form.Check // prettier-ignore
                          type="switch"
                          label="Autogenerate"
                          id="custom-switch"
                          checked={checked}
                          onChange={(e) => { change_auto_generate(e) }}
                        />
                      </div>
                    </div>
                  </>}
              </>
            }
            {!loading && user.limit >= 20 && !user.unlimited &&
              <LimitReached />
            }
          </>
        }
      </main >
      <Footer />

    </>
  );
}

export default Home;