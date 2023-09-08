import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../../config/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { message } from 'antd';
import { useAuthContext } from '../../contexts/AuthContext';

const initialUserState = { email: '', password: '' }
export default function Signup() {
    const [user, setUser] = useState(initialUserState)
    const [isProcessing, setIsProcessing] = useState(false)
    const { dispatch } = useAuthContext()
    const handleChange = (e) => {
        setUser((user) => ({ ...user, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (document.getElementById('confirmPass').value !== document.getElementById('password').value) {
            return alert('Password did not match!')
        }
        setIsProcessing(true)
        const { email, password } = user;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const createdUser = userCredential.user;
                addUser(createdUser)
            })
            .catch((error) => {
                message.error("Something went wrong. Please try again.")
                console.error(error)
                setIsProcessing(false)
            })

        const addUser = async (createdUser) => {
            try {
                const { email, uid } = createdUser;
                const { fName, lName, userName } = user
                const userData = {
                    email, uid, fName, lName, userName,
                    dateCreated: serverTimestamp()
                }
                await setDoc(doc(firestore, 'users', uid), userData)
                message.success('Account created successfully!')
                dispatch({ type: "SET_IS_LOGGED_IN", payload: { user: userData } })
            }
            catch (err) {
                console.log(err)
            }
            setIsProcessing(false)
        }
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center mt-5'>Signup</h1>
                        <div className="card w-75 mx-auto mt-3 p-4">
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className="col-12 col-md-6"> <input type="text" className='form-control mb-2' placeholder='First Name' name="fName" onChange={handleChange} /></div>
                                    <div className="col-12 col-md-6"> <input type="text" className='form-control mb-2' placeholder='Last Name' name="lName" onChange={handleChange} /></div>
                                    <div className="col-12 col-md-6"> <input type="text" className='form-control mb-2' placeholder='Email' name="email" onChange={handleChange} /></div>
                                    <div className="col-12 col-md-6"> <input type="text" className='form-control mb-2' placeholder='Username' name="userName" onChange={handleChange} /></div>
                                    <div className="col-12 col-md-6"> <input type="password" className='form-control mb-2' placeholder='Password' name="password" id='password' onChange={handleChange} /></div>
                                    <div className="col-12 col-md-6"> <input type="password" className='form-control mb-2' placeholder='Confirm Password' id='confirmPass' /></div>
                                    <button className='btn btn-success my-2 col-12 col-md-6 offset-md-3' id='signupBtn' onClick={handleSubmit}>
                                        {!isProcessing
                                            ? "Signup"
                                            : <>
                                                <div className='spinner-grow spinner-grow-sm me-1 mb-0'></div>
                                                <div className='spinner-grow spinner-grow-sm me-1 mb-0'></div>
                                                <div className='spinner-grow spinner-grow-sm m-1 mb-0'></div>
                                            </>
                                        }
                                    </button>
                                    <p className='text-center'>Already have an account? <Link to={"/auth/login"}>Login</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
