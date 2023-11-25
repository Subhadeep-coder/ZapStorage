import React, { useState } from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { database, storage } from '../../../firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../../hooks/useFolder';
import { addDoc } from 'firebase/firestore';
import ProgressBar from '../ProgressBar';

const AddFile = ({ currentFolder }) => {

    const { currentUser } = useAuth();
    const [percent, setPercent] = useState(0);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return

        // const parentPath = currentFolder.path.length > 0 ? `${currentFolder.path.join('/')}/${file.name}` : '';
        const filePath = currentFolder === ROOT_FOLDER
            ? `${currentFolder.path.map(f => f.name).join('/')}/${file.name}`
            : `${currentFolder.path.map(f => f.name).join('/')}/${currentFolder.name}/${file.name}`;

        // Resource: https://www.makeuseof.com/upload-files-to-firebase-using-reactjs/
        const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    console.log(url);
                    await addDoc(database.files,
                        {
                            url: url,
                            name: file.name,
                            createdAt: database.getCurrentTimeStamp(),
                            folderId: currentFolder.id,
                            userId: currentUser.uid
                        })
                });
            }
        );
    }


    return (
        <>
            <ProgressBar percent={percent} />
            <label className='btn btn-outline-success btn-sm m-0 mx-2'>
                <BsFileEarmarkPlus />
                <input
                    type="file"
                    onChange={handleUpload}
                    style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
                />
            </label>
        </>
    )
}

export default AddFile