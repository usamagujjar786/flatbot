import './styles/public.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PublicContext } from '../../useContext/PublicContext';
import { useContext, useState } from 'react';
const Forgot = () => {
    const { setActive } = useContext<{ setActive: any }>(PublicContext)
    const [current, setCurrent] = useState<number>(1)
    return (
        <>
            <h2 className="heading">Forgot Password</h2>
            <Form>
                {current === 1 &&
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" required />
                        </Form.Group>
                        <div className='bottom'>
                            <a href='javascript:;' onClick={() => setActive(1)}>Register</a>
                            <Button variant="primary" type="submit" className="submit" size="sm" onClick={() => setCurrent(2)}>
                                Submit
                            </Button>
                            <a className='last' href='javascript:;' onClick={() => setActive(1)}>Login</a>
                        </div>
                    </>
                }
                {current === 2 &&
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter OTP from you mailbox" required />
                        </Form.Group>
                        <div className='bottom'>
                            <a href='javascript:;' onClick={() => setActive(1)}>Register</a>
                            <Button variant="primary" type="submit" className="submit" size="sm" onClick={() => setCurrent(3)}>
                                Submit
                            </Button>
                            <a className='last' href='javascript:;' onClick={() => setActive(1)}>Login</a>
                        </div>
                    </>
                }
                {current === 3 &&
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="password" placeholder="Enter New Password" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="password" placeholder="Confirm New Password" required />
                        </Form.Group>
                        <div className='bottom'>
                            <a href='javascript:;' onClick={() => setActive(1)}>Register</a>
                            <Button variant="primary" type="submit" className="submit" size="sm" onClick={() => setActive(1)}>
                                Submit
                            </Button>
                            <a className='last' href='javascript:;' onClick={() => setActive(1)}>Login</a>
                        </div>
                    </>
                }

            </Form>
        </>
    );
}

export default Forgot;