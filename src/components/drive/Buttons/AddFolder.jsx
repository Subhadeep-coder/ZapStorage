import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { BsFolderPlus } from 'react-icons/bs';
import { database } from '../../../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../../hooks/useFolder';

const AddFolder = ({ currentFolder }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const { currentUser } = useAuth();

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentFolder === null) {
            return
        }
        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id });
        }
        //Create a folder in database
        // Resource: https://stackoverflow.com/questions/71357147/how-to-create-a-collection-in-firebase-using-react
        const document = await addDoc(database.folders, {
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimeStamp()
        });
        setName('');
        closeModal();
    }

    return (
        <>
            <Button variant='outline-success' size='sm' onClick={openModal}>
                <BsFolderPlus style={{ margin: 'auto', fontSize: '24px' }} />
                <span className='mx-1' style={{ margin: 'auto', fontSize: '18px' }}>Add File</span>
            </Button>
            <Modal show={open} onHide={closeModal} centered>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name:</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModal}>Close</Button>
                        <Button variant='dark' type='submit'>Add Folder</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddFolder