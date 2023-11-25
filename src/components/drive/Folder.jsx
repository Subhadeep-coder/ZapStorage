import React from 'react'
import { Link } from 'react-router-dom'
import { BsFolder2 } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

const Folder = ({ folder }) => {
    return (
        <>
            <Button
                to={{
                    pathname: `/folders/${folder.id}`,
                    state: { folder: folder }
                }}
                variant='outline-dark'
                className='text-truncate w-100'
                as={Link}
            >
                <BsFolder2 />
                <span style={{ marginLeft: '8px' }}>{folder.name}</span>
            </Button>
        </>
    )
}

export default Folder