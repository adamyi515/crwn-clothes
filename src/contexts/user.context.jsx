import React, { createContext, useReducer, useState, useEffect } from "react";
// Firebase Utils
import { onAuthStateChangedListener, signOutUser } from '../utils/firebase/firebase.utils';

const initialState = {
    currentUser: null,
    setCurrentUser: () => null
}
export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {
        currentUser, setCurrentUser
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    return(
        <UserContext.Provider value={value} >
            { children }
        </UserContext.Provider>
    )
}