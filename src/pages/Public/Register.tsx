import './styles/public.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PublicContext } from '../../useContext/PublicContext';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AlertContext } from '../../useContext/AlertContext';
import { v4 as uuidv4 } from 'uuid';
import { Spinner } from 'react-bootstrap';
import './styles/register.css'
import { AuthContext } from '../../useContext/AuthContext';
import { ProtectedContext } from '../../useContext/ProtectedContext';
import { url } from '../../utils/url';
const Register = () => {
  const { setActive } = useContext<{ setActive: any }>(PublicContext)
  const { ShowProfile } = useContext<{ setActive: any, ShowProfile: any }>(ProtectedContext)
  const { setAlertList, inProcess, setInProcess } = useContext<{ setAlertList: any, inProcess: boolean, setInProcess: any }>(AlertContext)
  const [full_name, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [aggree, setAggree] = useState<boolean>(false)
  const [password_confirmation, setPasswordConfirmation] = useState<string>('')
  const { login } = useContext<{ login: any }>(AuthContext)
  const handleRegsiter = async () => {
    setInProcess(true)
    let formdata = {
      full_name,
      email,
      password,
      confirm_password: password_confirmation,
      checked: aggree
    }
    try {
      const res = await axios.post(`${url}/user/signup`, formdata)
      console.log(res.data)
      if (res.data.success) {
        localStorage.setItem('flatbot', res.data.data.token)
        setAlertList({ id: uuidv4(), msg: res.data.message, type: 'success' })
        login()
        setInProcess(false)
      }
      // if (res.status === 201) {
      //   let access_token: string = ""
      //   Object.keys(res.headers).forEach(async function (key, index) {
      //     if (key === 'access-token') {
      //       access_token = res.headers[key]
      //     }
      //   })
      //   localStorage.setItem('flatbot_uid', res.headers.uid)
      //   localStorage.setItem('flatbot_client', res.headers.client)
      //   localStorage.setItem('flatbot_access-token', access_token)
      //   setAlertList({ id: uuidv4(), msg: "Account Created", type: 'success' })
      //   ShowProfile()
      //   login()
      // }
      // setInProcess(false)
    } catch (error: any) {
      console.log(error)
      setAlertList({ id: uuidv4(), msg: error.response.data.message, type: 'danger' })
      setInProcess(false)
      // if (typeof error.response.data.alert === "object") {
      //   error.response.data.alert.map((item: string): void => {
      //     setAlertList({ id: uuidv4(), msg: item, type: 'danger' })
      //   })
      // } else {
      //   setAlertList({ id: uuidv4(), msg: error.response.data.alert, type: 'danger' })
      // }
      // setInProcess(false)
    }
  }
  return (
    <>
      {/* <h2 className="heading">Register</h2> */}
      <div className='heading'>
        <h2 className='main_heading'>Create an Account</h2>
        <p className='caption'>Get started with flatbot</p>
      </div>
      <Form>
        <Form.Group className="mb-3 input_field" controlId="formBasicEmail" >
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Andrew Tate" value={full_name} onChange={e => setFullName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3 input_field" controlId="formBasicPassword">
          <Form.Label>Choose a password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3 input_field" controlId="formBasicConfirmPassword">
          <Form.Label>Enter password again</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
        </Form.Group>
        <Form.Check
          type="checkbox"
          label='I accept the data privacy policy'
          id='checkbox'
          checked={aggree}
          onChange={() => setAggree(prev => !prev)}
        />
        <div className='bottom'>
          <a href='javascript:;' onClick={() => setActive(1)} className='extension'>Already have an account? <span>Log In</span></a>
          <button className="submit" onClick={handleRegsiter} disabled={inProcess || !email || !password || !full_name || !password_confirmation || !aggree}>
            {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : (!email || !password || !full_name || !password_confirmation || !aggree) ? <img src='img/Sign_Up_disabled.png' /> : <img src='img/Sign_Up.png' />}
          </button>
        </div>
      </Form>
    </>
  );
}

export default Register;