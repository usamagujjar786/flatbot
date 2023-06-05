import './styles/public.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PublicContext } from '../../useContext/PublicContext';
import { useContext } from 'react';
import { AuthContext } from '../../useContext/AuthContext';
const Login = () => {
    const { setActive } = useContext<{ setActive: any }>(PublicContext)
    const { login } = useContext<{ login: any }>(AuthContext)
    return (
        <>
            <h2 className="heading">Login</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <div className='bottom'>
                    <a href='javascript:;' onClick={() => setActive(3)}>Forgot password?</a>
                    <Button variant="primary" type="submit" className="submit" size="sm" onClick={() => login()}>
                        Login
                    </Button>
                    <a className='last' href='javascript:;' onClick={() => setActive(2)}>Register</a>
                </div>
            </Form>
        </>
    );
}

export default Login;