import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import Auth from "./Auth"
//components
import Header from '../components/Header'
import Footer from '../components/Footer'

import Frontend from "./Frontend"

export default function Index() {
  const {isAuthentic} = useAuthContext()
  return (
    <>
    <Header />
    <main className='main'>
    <Routes>
        <Route path='/*' element={!isAuthentic ? <Navigate to={"/auth"} /> : <Frontend />} />
        <Route path='/auth/*' element={!isAuthentic ? <Auth /> : <Navigate to='/' />} />
    </Routes>
    </main>
    <Footer />
    </>
  )
}
