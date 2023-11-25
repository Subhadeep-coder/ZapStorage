import React, { useEffect, useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
                    <Button variant='dark' className='btn btn-primary w-100 mt-3' onClick={() => navigate(`/update-profile`)} >Update Profile</Button>
                </Card.Body>
            </Card>
            <div className="flex flex-row w-100">
                <div className="w-1/2 text-center mt-2">
                    <Button variant="dark" onClick={() => navigate('/')}>Back to Dashboard</Button>
                </div>
                <div className="w-1/2 text-center mt-2">
                    <Button variant='link' className='text-dark' onClick={handleLogOut}>Logout</Button>
                </div>
            </div>
        </CenteredContainer>
    )
}

export default Profile