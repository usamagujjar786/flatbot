import './styles/public.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PublicContext } from '../../useContext/PublicContext';
import { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { AlertContext } from '../../useContext/AlertContext';
import axios from 'axios';
import { url } from '../../utils/url';
import { v4 as uuidv4 } from 'uuid';

const Forgot = () => {
  const { setAlertList, inProcess, setInProcess } = useContext<{ setAlertList: any, inProcess: boolean, setInProcess: any }>(AlertContext)
  const { setActive } = useContext<{ setActive: any }>(PublicContext)
  const [current, setCurrent] = useState<number>(1)
  const [email, setEmail] = useState<string>('')
  const [otp, setOtp] = useState<number>()
  const [password, setPassword] = useState<string>('')
  const [confirm_password, setConfirm_password] = useState<string>('')
  const forgot_step_1 = async (e: any) => {
    setInProcess(true)
    e.preventDefault()
    try {
      const res = await axios.post(`${url}/user/forgot_step_1`, { email })
      if (res.data.success) {
        setAlertList({ id: uuidv4(), msg: res.data.message, type: 'success' })
        setCurrent(2)
        setInProcess(false)
      }
    } catch (error: any) {
      setAlertList({ id: uuidv4(), msg: error.response.data.message, type: 'danger' })
      setInProcess(false)
    }
  }

  const forgot_step_2 = async (e: any) => {
    setInProcess(true)
    e.preventDefault()
    try {
      const res = await axios.post(`${url}/user/forgot_step_2`, { email, otp })
      if (res.data.success) {
        setAlertList({ id: uuidv4(), msg: res.data.message, type: 'success' })
        setCurrent(3)
        setInProcess(false)
      }
    } catch (error: any) {
      setAlertList({ id: uuidv4(), msg: error.response.data.message, type: 'danger' })
      setInProcess(false)
    }
  }

  const forgot_step_3 = async (e: any) => {
    setInProcess(true)
    e.preventDefault()
    try {
      const res = await axios.post(`${url}/user/forgot_step_3`, { email, password, confirm_password })
      if (res.data.success) {
        setAlertList({ id: uuidv4(), msg: res.data.message, type: 'success' })
        setActive(1)
        setInProcess(false)
      }
    } catch (error: any) {
      setAlertList({ id: uuidv4(), msg: error.response.data.message, type: 'danger' })
      setInProcess(false)
    }
  }
  return (
    <>
      <Form>
        {current === 1 &&
          <>
            <div className='top-heading'>
              <h2 className="heading1">Reset Your Password</h2>
              <p className='caption'>Forgot your password? Reset it here.</p>
            </div>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>What's your Email?</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <div className='bottom'>
              <button className="submit" onClick={(e) => { forgot_step_1(e) }} disabled={!email}>
                {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : (!email) ? <span className='register_button'>Send Reset Link<img className="go" src='img/go-disabled.png' /></span> : <span className='register_button'>Send Reset Link <img className="go" src='img/go.png' /></span>}
              </button>
            </div>
          </>
        }
        {current === 2 &&
          <>
            <div className='top-heading'>
              <h2 className="heading1">Reset Your Password</h2>
              <p className='caption'>Forgot your password? Reset it here.</p>
            </div>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>OTP from email</Form.Label>
              <Form.Control type="number" min="0" placeholder="Enter OTP sent to email" required value={otp} onChange={(e) => setOtp(parseInt(e.target.value))} />
            </Form.Group>
            <div className='bottom'>
              <button className="submit" onClick={(e) => { forgot_step_2(e) }} disabled={!email || !otp}>
                {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : (!email || !otp) ? <span className='register_button'>Submit OTP<img className="go" src='img/go-disabled.png' /></span> : <span className='register_button'>Submit OTP <img className="go" src='img/go.png' /></span>}
              </button>
            </div>
          </>
        }
        {current === 3 &&
          <>
            <div className='top-heading'>
              <h2 className="heading1">Enter New Password</h2>
              <p className='caption'>Please enter a new password with at least 8 characters.</p>
            </div>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter a new password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" placeholder="Retype above password" required value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} />
            </Form.Group>
            <div className='bottom'>
              <button className="submit" onClick={(e) => { forgot_step_3(e) }} disabled={!password || !confirm_password}>
                {inProcess ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : (!password || !confirm_password) ? <span className='register_button'>Reset Password<img className="go" src='img/go-disabled.png' /></span> : <span className='register_button'>Reset Password <img className="go" src='img/go.png' /></span>}
              </button>
            </div>
          </>
        }
        {current === 4 &&
          <>
            <div className='top-heading'>
              <h2 className="heading1 ">Password Reset Success</h2>
              <p className='caption'>Your password has been reset successfully. Login to continue.</p>
            </div>
            <div className='links'>
              <div onClick={() => setCurrent(1)}><img src='img/arrow-back.png' /><p>Enter different email</p></div>
              <div onClick={() => setActive(2)}><img src='img/arrow-back.png' /><p>Sign Up</p></div>
            </div>
          </>
        }
        {/* {current === 3 &&
          <>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter New Password" required />
            </Form.Group>
            <Form.Group className="mb-3 input_field" controlId="formBasicEmail">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm New Password" required />
            </Form.Group>
            <div className='bottom'>

            </div>
          </>
        } */}

      </Form>
    </>
  );
}

export default Forgot;