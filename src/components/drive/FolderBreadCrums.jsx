import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { Link, useNavigate } from 'react-router-dom';

const FolderBreadCrums = ({ currentFolder }) => {

    let path = (currentFolder === ROOT_FOLDER) ? [] : [ROOT_FOLDER];
    if (currentFolder) {
        path = [...path, ...currentFolder.path];
    }

    const navigate = useNavigate();

    const handleClick = (folder, index) => {
        const pathname = folder.id ? `/folders/${folder.id}` : '/';
        const passState = { folder: { ...folder, path: path.slice(1, index) } };
        navigate(pathname, { state: passState });
    }

    return (
        <>
            <Breadcrumb className='flex-grow-1' listProps={{ className: 'bg-white pl-0 m-0' }}>
                {
                    path.map((folder, index) => {
                        return (
                            <Breadcrumb.Item
                                key={folder.id}
                                // linkAs={Link}
                                // linkProps={{
                                //     to: {
                                //         pathname: folder.id ? `/folders/${folder.id}` : '/',
                                //         state: { folder: { ...folder, path: path.slice(1, index) } }
                                //     },
                                // }}
                                className='text-truncate d-inline-block'
                                style={{ maxWidth: '150px' }}
                                onClick={() => handleClick(folder, index)}
                            >
                                {folder.name}
                            </Breadcrumb.Item>
                        )
                    })
                }
                {
                    currentFolder && (
                        <Breadcrumb.Item
                            linkAs={Link}
                            className='text-truncate d-inline-block'
                            style={{ maxWidth: '200px' }}
                            active
                        >
                            {currentFolder.name}
                        </Breadcrumb.Item>
                    )
                }
            </Breadcrumb >
        </>
    )
}

export default FolderBreadCrums