import React, { useEffect, useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

const Profile = () => {

    const [error, setError] = useState('');

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) navigate('/login');
    }, [currentUser, navigate])


    const handleLogOut = async () => {
        setError('');
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            setError('Failed to logout');
        }
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong>Email:</strong>{currentUser?.email}
                    <Link className='btn btn-primary w-100 mt-3' to={`/update-profile`}>Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleLogOut}>Logout</Button>
            </div>
        </CenteredContainer>
    )
}

export default Profile