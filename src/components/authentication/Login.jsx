import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError('Failed to Login');
        }
        setLoading(false);
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Login</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Button variant='dark' disabled={loading} type='submit' className='w-100'>Login</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link className='text-dark' to={`/forgot-password`} >Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have am account? <Link className='text-dark' to={`/signup`}>SignUp</Link>
            </div>
        </CenteredContainer>
    )
}

export default Login