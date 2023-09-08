import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import { useAuthContext } from '../../contexts/AuthContext';
import { message } from 'antd';

const initialState = {}
export default function Login() {
    const { readUserProfile } = useAuthContext()
    const [user, setUser] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => {
        setUser((user) => ({ ...user, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true)
        const { email, password } = user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                readUserProfile(user)
            })
            .catch((error) => {
                message.error("User data not found. Please try again or contact support team")
                console.log('error', error)
            })
            .finally(() => {
                setIsProcessing(false)
            });
    }
    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center mt-5'>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                                <div className="card w-100 mx-auto mt-3 p-4">
                                    <div className="row">
                                        <div className="col-12 "> <input type="text" className='form-control mb-2' placeholder='Email' name="email" onChange={handleChange} /> </div>
                                        <div className="col-12 "> <input type="password" className='form-control mb-2' placeholder='Password' name="password" onChange={handleChange} /> </div>
                                    </div>
                                    <button className='btn btn-success my-2 col-12 col-md-4 offset-md-4 '>
                                        {!isProcessing
                                            ? "Login"
                                            : <>
                                                <div className='spinner-grow spinner-grow-sm me-1 mb-0'></div>
                                                <div className='spinner-grow spinner-grow-sm me-1 mb-0'></div>
                                            </>
                                        }
                                    </button>
                                    <p className='text-center mb-0'>Don't have an account? <Link to={"/auth/signup"}>Signup</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
