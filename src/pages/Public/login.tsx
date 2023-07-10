import './styles/public.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PublicContext } from '../../useContext/PublicContext';
import { useContext } from 'react';
import { AuthContext } from '../../useContext/AuthContext';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { AlertContext } from '../../useContext/AlertContext';
import { Spinner } from 'react-bootstrap';
import { url } from '../../utils/url';

const Login = () => {
  const { login } = useContext<{ login: any }>(AuthContext)
  const { setActive } = useContext<{ setActive: any }>(PublicContext)
  const { setAlertList, inProcess, setInProcess } = useContext<{ setAlertList: any, inProcess: boolean, setInProcess: any }>(AlertContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleLogin = async (e: any) => {
    e.preventDefault()
    setInProcess(true)
    try {
      let formdata = {
        email,
        password,
      }
      const res = await axios.post(`${url}/user/login`, formdata)
      if (res.data.success) {
        localStorage.setItem('flatbot', res.data.token)
        setAlertList({ id: uuidv4(), msg: res.data.message, type: 'success' })
        setInProcess(false)
        login()
      }
      // if (res.status === 200) {
      //   let access_token: string = ""
      //   Object.keys(res.headers).forEach(async function (key, index) {
      //     if (key === 'access-token') {
      //       access_token = res.headers[key]
      //     }
      //   })
      //   localStorage.setItem('flatbot_uid', res.headers.uid)
      //   localStorage.setItem('flatbot_client', res.headers.client)
      //   localStorage.setItem('flatbot_access-token', access_token)
      //   setAlertList({ id: uuidv4(), msg: "Login success", type: 'success' })

    } catch (error: any) {
      setAlertList({ id: uuidv4(), msg: error.response.data.message, type: 'danger' })
      setInProcess(false)
    }
  }
  return (
    <>
      <h2 className="heading">Login</h2>
      <Form>
        <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3 input_field" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <div className='bottom'>
          <a href='javascript:;' onClick={() => setActive(3)} className='extension'>Forgot your password?<span>Reset it</span></a>
          <button className="submit" onClick={handleLogin} disabled={!email || !password || inProcess} >
            {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : (!email || !password) ? <span className='register_button'>Login <img className="go" src='img/go-disabled.png' /></span> : <span className='register_button'>Login <img className="go" src='img/go.png' /></span>}
          </button>
        </div>
      </Form>
    </>
  );
}

export default Login;