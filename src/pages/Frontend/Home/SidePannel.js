import React, { useEffect, useState } from 'react'
import { Divider, Input, Layout, Modal } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { AiOutlineBars } from 'react-icons/ai'
import { VscSettings } from 'react-icons/vsc'
import { BsListCheck, BsCalendar3 } from 'react-icons/bs'
import { CgNotes } from 'react-icons/cg'
import { FaSignOutAlt, FaAngleDoubleRight, FaSignInAlt } from 'react-icons/fa'
import { FcExpired } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { GrAdd } from 'react-icons/gr'
import { useAuthContext } from '../../../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth, firestore } from '../../../config/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import List from './List'

export default function SidePannel() {
    const [addingList, setAddingList] = useState(false)
    // const [listTypesFromFireStore , setListTypesFromFireStore] = useState([]);
    const [listTypes, setListTypes] = useState([{ value: 'Personal', label: 'Personal', }, { value: 'Work', label: 'Work' }])
    const [newListType, setNewListType] = useState('')
    const [addListModal, setAddListModal] = useState(false)

const listsFromFireStore = async()=>{
    const lists = []
    const r = query(collection(firestore, "lists"), where("uid", "==", auth.currentUser.uid));
    const querySnapshotofLists = await getDocs(r);
    querySnapshotofLists.forEach((li) =>{
        let l = li.data()
        lists.push(l)
    })
    setListTypes(a=>([...a, ...lists]))
}

const addNewListType = async () => {
    if (newListType.trim() !== '') {
        const newList = {
                value: newListType,
                label: newListType,
                uid: auth.currentUser.uid,
            };
            setAddingList(true)
            setListTypes([...listTypes, newList])
            try {
                const docRef = doc(firestore, "lists", newList.value)
                await setDoc(docRef, newList);
                console.log("Document written with ID: ", newList);
                setAddingList(false)
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            listsFromFireStore()
            setNewListType('');
            setAddListModal(false)
        }
    }
    
    const handleListModal = () => {
        setAddListModal(true)
    }
    // useEffect(() =>{
    //     listsFromFireStore()
    // }, [])



    const { isAuthentic, dispatch } = useAuthContext()
    const handleLogout = () => {
        signOut(auth)
        dispatch({ type: "SET_IS_LOGGED_OUT" })
        console.log(dispatch.type)
    }

    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={toggleSidebar} className='side-pannel bg-white rounded me-1 me-md-3'>
                <Layout className='side-pannel-layout d-flex flex-column h-100'>
                    <Header className='side-header px-2 pb-0 mb-0 d-flex align-items-center justify-content-between'>
                        <h4 style={{ display: 'inline-block', cursor: 'pointer' }} onClick={toggleSidebar}>Menu</h4>
                        <AiOutlineBars className='me-3' onClick={toggleSidebar} style={{ display: 'inline-block', cursor: 'pointer' }} />
                    </Header>
                    {!collapsed &&
                        <>
                            <Content className='side-content px-2'>
                                <Input type="search" className='search-box mx-4 w-75 mb-3' placeholder='Search' name="" id="" />
                                <h6>Tasks</h6>
                                <ul className='list-unstyled mb-3'>
                                    <li className='mb-2' ><FaAngleDoubleRight className='me-2' /><Link to={'/upcoming'} className='text-decoration-none text-black'>Upcoming</Link></li>
                                    <li className='mb-2' ><BsListCheck className='me-2' /> <Link to={'/today'} className='text-decoration-none text-black'>Today</Link></li>
                                    <li className='mb-2' ><BsCalendar3 className='me-2' /> <Link to={'/seldatecards'} className='text-decoration-none text-black'>Calendar</Link></li>
                                    <li className='mb-2' ><CgNotes className='me-2' /><Link to={'/wall'} className='text-decoration-none text-black'>Sticky Wall</Link></li>
                                    <li className='mb-2' ><FcExpired className='me-2' /><Link to={'/wall'} className='text-decoration-none text-black'>Out Dated</Link></li>
                                </ul>
                                <Divider className='m-2' />
                                <h6>Lists</h6>
                                <ul className='list-unstyled'>
                                    {
                                        listTypes.map((a) => {
                                            return <li key={a.label} value={a.value}  className='m-1 d-block w-75'><CgNotes   className='me-2 mb-1' />  <Link to={'/list'} className='text-decoration-none text-black'>{a.label}</Link></li>
                                        })
                                    }
                                    {/* <li className='mb-2' ><CgNotes className='me-2' /> <Link to={'/list'} className='text-decoration-none text-black'>Work</Link></li> */}
                                    <li className='m-1 bg-info p-1 rounded w-75'  onClick={handleListModal}><GrAdd className='me-2'/>Add List</li>
                                </ul>
                                <Divider className='m-2' />
                                <h6>Tags</h6>
                                <ul className='list-inline'>
                                    <li className='mb-2 list-inline-item' ><Link className='bg-info rounded p-1 text-decoration-none text-black'>Tag 1</Link></li>
                                    <li className='mb-2 list-inline-item' ><Link className='bg-info rounded p-1 text-decoration-none text-black'>Tag 2</Link></li>
                                </ul>
                            </Content>
                            <Footer className='side-footer p-2'>
                                <ul className='list-unstyled'>
                                    <li className='mb-2' ><VscSettings className='me-2' /><Link to={'/dashboard'} className='text-decoration-none text-black'>Settings</Link></li>
                                    <li className='me-2'>
                                        {!isAuthentic
                                            ? <>
                                                <FaSignInAlt className='me-2' />
                                                <Link to={'/auth'} className='text-decoration-none text-black'>Login</Link>
                                            </>
                                            : <>
                                                <FaSignOutAlt className='me-2' />
                                                <Link onClick={handleLogout} className='text-decoration-none text-black'>Signout</Link>
                                            </>
                                        }
                                    </li>
                                </ul>
                            </Footer>
                        </>
                    }
                </Layout>
            </Sider>
            <Modal
                title="Add List Type"
                open={addListModal}
                onOk={addNewListType}
                confirmLoading={addingList}
                onCancel={() => setAddListModal(false)}
            >
                <Input
                    value={newListType}
                    onChange={(e) => setNewListType(e.target.value)}
                    placeholder="Enter List Type"
                />
            </Modal>
        </>
    )
}
