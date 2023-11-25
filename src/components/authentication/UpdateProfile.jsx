import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const UpdateProfile = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const cpasswordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { updateUserEmail, updateUserPassword, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== cpasswordRef.current.value) {
            return setError('Password don\'t match');
        }

        const promises = [];
        setError('');
        setLoading(true);
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updateUserPassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            navigate('/user');
        }).catch((e) => {
            setError('Failed to update account', e);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same' />
                        </Form.Group>
                        <Form.Group id='passowrd-confirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' ref={cpasswordRef} placeholder='Leave blank to keep the same' />
                        </Form.Group>
                        <Button disabled={loading} type='submit' className='w-100'>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button as={Link} to={`/`} className='w-100'>Back to Dashboard</Button>
                <Link to={`/user`}>Cancel</Link>
            </div>
        </CenteredContainer>
    )
}

export default UpdateProfile