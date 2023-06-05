import './styles/public.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PublicContext } from '../../useContext/PublicContext';
import { useContext } from 'react';
const Register = () => {
    const { setActive } = useContext<{ setActive: any }>(PublicContext)
    return (
        <>
            <h2 className="heading">Register</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Full Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Control type="password" placeholder="Confirm Password" required />
                </Form.Group>
                <div className='bottom'>
                    <a href='javascript:;' onClick={() => setActive(3)}>Forgot password?</a>
                    <Button variant="primary" type="submit" className="submit" size="sm">
                        Register
                    </Button>
                    <a className='last' href='javascript:;' onClick={() => setActive(1)}>Login</a>
                </div>
            </Form>
        </>
    );
}

export default Register;