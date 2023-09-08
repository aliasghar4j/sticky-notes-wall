import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { auth, firestore } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { message } from 'antd'
const AuthContext = createContext()
const initialState = { isAuthentic: false, user: {} }
export const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_IS_LOGGED_IN":
            return { isAuthentic: true, user: payload.user }
        case "SET_IS_LOGGED_OUT":
            return initialState
        default:
            return state
    }
}
export default function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                readUserProfile(user)
            }
        });
    }, [])
    const readUserProfile = async (user) => {
        setLoading(true)
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user = docSnap.data()
            // console.log('user', user)
            dispatch({ type: "SET_IS_LOGGED_IN", payload: { user } })
        } else {
            message.error("User data not found.")
        }
        setLoading(false)
    }
    return (
        <> {loading
            ? <main className='main d-flex justify-content-center align-items-center'>
                <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                    <div className="spinner-grow me-2 text-primary" role="status">
                    </div>
                    <div className="spinner-grow me-2 text-secondary" role="status">
                    </div>
                    <div className="spinner-grow me-2 text-success" role="status">
                    </div>
                    <div className="spinner-grow me-2 text-danger" role="status">
                    </div>
                    <div className="spinner-grow me-2 text-warning" role="status">
                    </div>
                </div>
            </main>
            : <AuthContext.Provider value={{ ...state, dispatch , readUserProfile}}>
                {children}
            </AuthContext.Provider>
        }
        </>
    )
}

export const useAuthContext = () => useContext(AuthContext)
