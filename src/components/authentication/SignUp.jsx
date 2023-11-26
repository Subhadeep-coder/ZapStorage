import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const cpasswordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== cpasswordRef.current.value) {
            return setError('Password don\'t match');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (error) {
            console.log(error.message);
            if (error.message.includes('email-already-in-use')) {
                setError('Already have an account');
            }
            else
                setError('Failed to create an account');
        }
        setLoading(false);
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password' className='mt-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id='passowrd-confirm' className='mt-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' ref={cpasswordRef} required />
                        </Form.Group>
                        <Button variant='dark' disabled={loading} type='submit' className='w-100 mt-4'>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link className='text-dark' to={`/login`}>Login</Link>
            </div>
        </CenteredContainer>
    )
}

export default SignUp