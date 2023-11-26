import { doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useReducer } from "react"
import { database, firestore } from "../firebase/firebase"
import { useAuth } from "../contexts/AuthContext"

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders',
    SET_CHILD_FILES: 'set-child-files',
}

export const ROOT_FOLDER = { name: 'Root', id: null, path: [] }

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: []
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles
            }
        default:
            return state;
    }
}

export const useFolder = (folderId = null, folder = null) => {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })

    const { currentUser } = useAuth();

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: { folderId, folder }
        })
    }, [folder, folderId]);

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            })
        }
        const folderRef = doc(firestore, 'folders', folderId);
        getDoc(folderRef)
            .then((doc) => {
                // console.log(database.formatDoc(doc));

                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: database.formatDoc(doc) }
                })
            })
            .catch((error) => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: ROOT_FOLDER }
                })
            });


    }, [folderId])

    useEffect(() => {

        const cleanup = currentUser && onSnapshot(
            query(
                database.folders,
                where('parentId', '==', folderId),
                where('userId', '==', currentUser.uid),
                orderBy('createdAt')
            ),
            (snapshot) => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDERS,
                    payload: { childFolders: snapshot.docs.map(database.formatDoc) }
                })
            },
            (error) => {
                console.error('Error fetching documents: ', error);
            }
        );
        return () => cleanup()
    }, [folderId, currentUser])


    useEffect(() => {

        const cleanup = currentUser && onSnapshot(
            query(
                database.files,
                where('folderId', '==', folderId),
                where('userId', '==', currentUser.uid),
                orderBy('createdAt')
            ),
            (snapshot) => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FILES,
                    payload: { childFiles: snapshot.docs.map(database.formatDoc) }
                })
            },
            (error) => {
                console.error('Error fetching documents: ', error);
            }
        );

        return () => cleanup()
    }, [folderId, currentUser])


    return state;
}