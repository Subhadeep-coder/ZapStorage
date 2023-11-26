import React, { useEffect, useState } from 'react'
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
import ProgressBar from './ProgressBar';
import Toast from './Toast';

const Dashboard = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { folderId } = useParams();
    const { state = {} } = useLocation();
    const { folder, childFolders, childFiles } = useFolder(folderId, state?.folder);


    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (!currentUser) navigate('/login');
    }, [currentUser, navigate])

    return (
        <>
            <Navbar />
            <Container fluid className='w-100 my-2'>
                {percent !== 0 && percent !== 100 && <ProgressBar percent={percent} />}
                <div className="d-flex align-items-center my-4">
                    {percent === 100 && <Toast />}
                    <FolderBreadCrums currentFolder={folder} />
                    <AddFile currentFolder={folder} setPercent={setPercent} />
                    <AddFolder currentFolder={folder} />
                </div>
                {
                    childFolders.length > 0 && (
                        <>
                            <h2>Folders</h2>
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
                            <h2>Files</h2>
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