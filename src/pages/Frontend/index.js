import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import About from './About'
import Contact from './Contact'
export default function Index() {
    return (
        <>
        {/* <Contact /> */}
            <Routes>
                <Route path='/*' Component={Home} />
                <Route path='about' Component={About} />
                <Route path='contact' Component={Contact} />
            </Routes>

        </>
    )
}
