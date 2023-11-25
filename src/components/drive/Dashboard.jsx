import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AddFolder from './Buttons/AddFolder';
import { useFolder } from '../../hooks/useFolder';
import Folder from './Folder';
import FolderBreadCrums from './FolderBreadCrums';
import AddFile from './Buttons/AddFile';
import File from './File';

const Dashboard = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { folderId } = useParams();
    const { state = {} } = useLocation();
    const { folder, childFolders, childFiles } = useFolder(folderId, state?.folder);
    console.log('Folders:', childFolders, 'Files:', childFiles);

    useEffect(() => {
        if (!currentUser) navigate('/login');
    }, [currentUser, navigate])

    return (
        <>
            <Navbar />
            <Container fluid>
                <div className="d-flex align-items-center">
                    <FolderBreadCrums currentFolder={folder} />
                    <AddFile currentFolder={folder} />
                    <AddFolder currentFolder={folder} />
                </div>
                {
                    childFolders.length > 0 && (
                        <>
                            <div className="d-flex flex-wrap">
                                {
                                    childFolders.map(childFolder =>
                                    (
                                        <div className="p-2" key={childFolder.id} style={{ maxWidth: '250px' }}>
                                            <Folder folder={childFolder} />
                                        </div>
                                    )
                                    )
                                }
                            </div>
                        </>
                    )
                }
                {childFolders.length > 0 && childFiles.length > 0 && <hr />}
                {
                    childFiles.length > 0 && (
                        <>
                            <div className="d-flex flex-wrap">
                                {
                                    childFiles.map(childFile => {
                                        return (
                                            <div className="p-2" key={childFile.id} style={{ maxWidth: '250px' }}>
                                                <File file={childFile} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                }
                {/* <File file={childFiles} /> */}
            </Container>
        </>
    )
}

export default Dashboard