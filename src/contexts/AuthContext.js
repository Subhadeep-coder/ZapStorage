import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}



const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const updateUserEmail = (email) => {
        return updateEmail(currentUser, email);
    }

    const updateUserPassword = (password) => {
        return updatePassword(currentUser, password)
    }

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe

    }, [])

    const value = {
        currentUser,
        signUp,
        loading,
        login,
        logout,
        forgotPassword,
        updateUserEmail,
        updateUserPassword
    }

    return (
        <AuthContext.Provider
            value={value}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider