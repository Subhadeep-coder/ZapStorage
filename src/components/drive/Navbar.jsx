import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <BootstrapNavbar className='justify-content-between' style={{padding:'20px'}} bg='light' expanded='sm'>
            <BootstrapNavbar.Brand as={Link}>
                ZapStorage
            </BootstrapNavbar.Brand>
            <Nav>
                <Nav.Link as={Link} to={`/user`}>Profile</Nav.Link>
            </Nav>
            </BootstrapNavbar>
        </>
    )
}

export default Navbar