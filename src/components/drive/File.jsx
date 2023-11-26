import React, { useEffect, useRef, useState } from 'react';
import { BsFileEarmark } from 'react-icons/bs';
import { CgMoreVerticalO } from "react-icons/cg";
import { MdOutlineFileDownload, MdDeleteForever, MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegCopy, FaRegShareFromSquare } from "react-icons/fa6";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const File = ({ file }) => {

    const navigator = useNavigate();

    const [openList, setOpenList] = useState(false);
    const [shareEmail, setShareEmail] = useState('');
    const [rename, setRename] = useState('');
    const [openShareModal, setOpenShareModal] = useState(false);
    const [openRenameModal, setOpenRenameModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const fileRef = doc(firestore, 'files', file.id);

    const handleOpenShareModal = () => {
        setOpenShareModal(true);
    }

    const handleCloseShareModal = () => {
        setOpenShareModal(false);
    }

    const handleOpenDeleteModal = (e) => {
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    const handleOpenRenameModal = () => {
        setOpenRenameModal(true);
    }

    const handleCloseRenameModal = () => {
        setOpenRenameModal(false);
    }

    const handleShare = async (e) => {
        e.preventDefault();
        console.log('Previous shared emails:', file.sharedEmails);
        const response = [...file.sharedEmails];
        response.push(shareEmail);
        await updateDoc(fileRef,
            {
                sharedEmails: response
            });
        setShareEmail('');
        setOpenShareModal(false);
    }

    const handleDeleteFile = async () => {
        await deleteDoc(fileRef);
        toast.warn('File deleted successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handleRenameFile = async (e) => {
        e.preventDefault();
        if (file.name === rename) setOpenRenameModal(false);
        await updateDoc(fileRef,
            {
                name: rename
            });
        setRename('');
        setOpenRenameModal(false);
        toast.success('File name updated successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handleCopyUrl = () => {
        //Get full URL
        const url = window.location.href;
        console.log('URL:', url);
        //Write Text to Clipboard
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(url);
        }
    }

    // For closing modal after clicking outside
    const menuRef = useRef();
    // useEffect(() => {
    //     const closeDropDown = (e) => {
    //         if (!menuRef.current.contains(e.target)) {
    //             setOpenList(false);
    //         }
    //     }

    //     document.addEventListener('mousedown', closeDropDown);
    //     return () => {
    //         document.removeEventListener('mousedown', closeDropDown)
    //     };
    // });


    return (
        <>
            <div
                className='w-100 border border-black p-2 d-flex align-items-center'
                style={{ borderRadius: '10px' }}
            >
                <a
                    href={file.url}
                    target='_blank'
                    rel='noreferrer'
                    className='text-truncate w-100 text-black mx-2'
                    style={{ textDecoration: 'none' }}
                >
                    <BsFileEarmark className='mr-2' />
                    <span className='mx-1'>{file.name}</span>
                </a>
                {
                    openList && (
                        <>
                            <div className="position-relative">
                                <ListGroup variant='flush' className='position-absolute' style={{ bottom: '10px', right: '0px', border: '1px solid black', borderRadius: '10px' }}>
                                    <ListGroup.Item className='d-flex align-items-center px-2' style={{ cursor: 'pointer' }} onClick={() => navigator(`${file.url}`)}>Download<MdOutlineFileDownload className='px-1 mx-1 fs-3' /></ListGroup.Item>
                                    <ListGroup.Item className='d-flex align-items-center px-2' style={{ cursor: 'pointer' }} onClick={() => { handleOpenShareModal(); setOpenList(false); }}>Share<FaRegShareFromSquare className='px-1 mx-1 fs-4' /></ListGroup.Item>
                                    <ListGroup.Item className='d-flex align-items-center px-2' style={{ cursor: 'pointer' }} onClick={() => { handleCopyUrl(); setOpenList(false); }}>Copy Url<FaRegCopy className='px-1 mx-1 fs-4' /></ListGroup.Item>
                                    <ListGroup.Item className='d-flex align-items-center px-2' style={{ cursor: 'pointer' }} onClick={() => { handleOpenRenameModal(); setOpenList(false); }}>Rename<MdDriveFileRenameOutline className='px-1 mx-1 fs-4' /></ListGroup.Item>
                                    <ListGroup.Item className='d-flex align-items-center px-2' style={{ cursor: 'pointer' }} onClick={() => { handleOpenDeleteModal(); setOpenList(false); }}>Delete<MdDeleteForever className='px-1 mx-1 fs-4' /></ListGroup.Item>
                                </ListGroup>
                            </div>
                        </>
                    )
                }
                <div
                    onClick={() => setOpenList(!openList)}
                    ref={menuRef}
                >
                    <CgMoreVerticalO />
                </div>
            </div>

            {/* Share Modal */}
            <Modal
                show={openShareModal}
                onHide={handleCloseShareModal}
                centered
            >
                <Form onSubmit={handleShare}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Give access to:</Form.Label>
                            <Form.Control
                                type='email'
                                required
                                value={shareEmail}
                                onChange={(e) => setShareEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseShareModal}>Close</Button>
                        <Button variant='success' type='submit'>Share file</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                show={openDeleteModal}
                onHide={handleCloseDeleteModal}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Delete File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure to delete this file?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseDeleteModal}>Close</Button>
                    <Button variant='success' type='submit' onClick={() => { handleDeleteFile(); handleCloseDeleteModal(); }}>Delete file</Button>
                </Modal.Footer>
            </Modal>

            {/* Rename Modal */}
            <Modal
                show={openRenameModal}
                onHide={handleCloseRenameModal}
                centered
            >
                <Form onSubmit={handleRenameFile}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Rename to:</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={rename}
                                onChange={(e) => setRename(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseRenameModal}>Close</Button>
                        <Button variant='success' type='submit'>Rename file</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default File