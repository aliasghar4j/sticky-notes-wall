import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Singup'
export default function Index() {
  return (
    <main className='main'>

    <Routes>
        <Route path='/' Component={Login} />
        <Route path='login' Component={Login} />
        <Route path='signup' element={<Signup />} />
    </Routes>
    </main>
  )
}

