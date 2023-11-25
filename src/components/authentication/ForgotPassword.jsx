import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const ForgotPassword = () => {

    const emailRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await forgotPassword(emailRef.current.value);
            setMessage('Check your inbox for further instruction');
        } catch (error) {
            console.log(error);
            setError('Failed to Reset Password');
        }
        setLoading(false);
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Forgot Password</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} type='submit' className='w-100'>Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link to={`/login`} >Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have am account? <Link to={`/signup`}>SignUp</Link>
            </div>
        </CenteredContainer>
    )
}

export default ForgotPassword