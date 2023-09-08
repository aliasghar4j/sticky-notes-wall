import React from 'react'
import SidePannel from './SidePannel'
import Wall from './Wall'
import { Route, Routes } from 'react-router-dom'
import AddCard from './AddCard'
import OutDatedCards from './OutDatedCards'
import SelDateCards from './SelDateCards'
import Today from './Today'
import Upcoming from './Upcoming'
import List from './List'
import { Layout } from 'antd'

export default function index() {
  return (
    <>
      <main id='main'>
        <Layout className='home-layout rounded m-2'>
          <SidePannel />
              <Routes>
                <Route path='/' element={< Wall />} />
                <Route path='/wall' element={< Wall />} />
                <Route path='/addcards' element={< AddCard />} />
                <Route path='/outdatedcards' element={<OutDatedCards />} />
                <Route path='/seldatecards' element={<SelDateCards />} />
                <Route path='/today' element={<Today />} />
                <Route path='/upcoming' element={<Upcoming />} />
                <Route path='/list' element={<List />} />
              </Routes>
        </Layout >
      </main >
    </>
  )
}
