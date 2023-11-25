import React from 'react';
import { BsFileEarmark } from 'react-icons/bs';

const File = ({ file }) => {
    return (
        <>
            <a
                href={file.url}
                target='_blank'
                className='btn btn-outline-dark text-truncate w-100'
                rel='noreferrer'>
                <BsFileEarmark className='mr-2' />
                {file.name}
            </a>
        </>
    )
}

export default File