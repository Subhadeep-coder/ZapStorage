import React, { useState } from 'react';
import { BsFileEarmark } from 'react-icons/bs';
import { CgMoreVerticalO } from "react-icons/cg";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegCopy, FaRegShareFromSquare } from "react-icons/fa6";
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const File = ({ file }) => {

    const [openList, setOpenList] = useState(false);
    const [shareEmail, setShareEmail] = useState('');
    const [openShareModal, setOpenShareModal] = useState(false);

    const handleOpenShareModal = () => {
        setOpenShareModal(true);
    }

    const handleCloseShareModal = () => {
        setOpenShareModal(false);
    }

    const handleShare = () => {
        setShareEmail('');
        setOpenShareModal(false);
    }
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
                                    <ListGroup.Item className='d-flex align-items-center px-2'>Download<MdOutlineFileDownload className='px-1 mx-1 fs-3' /></ListGroup.Item>
                                    <ListGroup.Item className='d-flex align-items-center px-2' onClick={handleOpenShareModal}>Share<FaRegShareFromSquare className='px-1 mx-1 fs-4' /></ListGroup.Item>
                                    <ListGroup.Item className='d-flex align-items-center px-2'>Copy Url<FaRegCopy className='px-1 mx-1 fs-4' /></ListGroup.Item>
                                </ListGroup>
                            </div>
                        </>
                    )
                }
                <div
                    onClick={() => setOpenList(!openList)}
                >
                    <CgMoreVerticalO />
                </div>
                {/*                 
                <Dropdown>
                    <Dropdown.Toggle
                        id='dropdown-basic'
                        onClick={() => setOpenModal(!openModal)}
                    >
                        <CgMoreVerticalO />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#'>Download</Dropdown.Item>
                        <Dropdown.Item href='#'>Share</Dropdown.Item>
                        <Dropdown.Item href='#'>Copy Url</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                 */}
            </div>

            <Modal
                show={openShareModal}
                onHide={handleCloseShareModal}
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
        </>
    )
}

export default File