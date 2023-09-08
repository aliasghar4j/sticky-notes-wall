import { Button, Dropdown, Form, Input, Layout, Modal, message } from 'antd';
import { firestore } from 'config/firebase';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { AiOutlineBars, AiOutlineLoading, AiOutlineSearch, AiTwotoneDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { auth } from '../../../config/firebase'
import AddCard from './AddCard';
import { FaEdit } from 'react-icons/fa';
import FormItem from 'antd/es/form/FormItem';
import { Content, Header } from 'antd/es/layout/layout';


export default function Wall() {
  const [calendarOpen, setCalendarOpen] = useState(true)
  const [dateSelected, setDateSelected] = useState('')
  const [loading, setLoading] = useState(true)
  const [notesFromFirebase, setNotesFromFirebase] = useState([])
  const [listTypesFromFireStore, setListTypesFromFireStore] = useState({});
  const [toAdd, setToAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [noteToBeUpdated, setNoteToBeUpdated] = useState({})

  const handleDateChange = (e) => {
    setDateSelected(e.target.value)
  }
  const handleDate = () => {
    setCalendarOpen(false)
    if ( dateSelected !== "" ) {
      fromFireStore()
      } else{
        // setNotesFromFirebase([])
        message.error('Please Select date.')
        setLoading(false)
      }
    }

  const fromFireStore = async () => {
    setLoading(true)
    const arr = [];
    const todayDate = (new Date()).toISOString().split('T')[0]
    const q = query(collection(firestore, "notes"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      dateSelected == data.date && arr.push(data)
    }
    );
    arr.length == 0 && message.info('No todo found.')   
    const lists = []
    const r = query(collection(firestore, "lists"), where("uid", "==", auth.currentUser.uid));
    const querySnapshotofLists = await getDocs(r);
    querySnapshotofLists.forEach((li) => {
      let l = li.data()
      lists.push(l)
    })
    setListTypesFromFireStore([...lists])
    setNotesFromFirebase(arr)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    setDeleting(true)
    console.log('deleting')
    await deleteDoc(doc(firestore, "notes", id))
    message.warning('Todo has been deleted.')
    setLoading(false)
    fromFireStore()
    setDeleting(false)
    console.log('deleted')
  }

  const handleEdit = (note) => {
    setEdit(true)
    setNoteToBeUpdated(note)
  }

  const add = () => {
    setToAdd(true)
  }
  const colorList = ["#ccd5ae", "#faedcd", "#d4a373", "#e9edc9", "#e3d5ca", "#fed9b7", "#ffbf69", "#ede0d4",
    "#eddea4", "#adb5bd", "#ccc5b9", "#eee4e1", "#e6beae", "#83c5be", "#bcb8b1", "#d9d9d9", "#d9dcd6", "#bfd8bd", "#ffe6a7", "#daf0ee",
    "#e0fbfc", "#b7b7a4", "#ddbea9", "#c6c5b9", "#7b9e89", "#efe6dd", "#efe5dc", "#cbbaa9", "#fde2e4", "#8d99ae", "#f9dcc4",
  ]
  return (
    <>
    
      
{/* 
          <Tooltip placement="left" title='Select Date'>
            <Button className='btn btn-info btn-sm' onClick={()=>{}}>
              <BsCalendar3 mb-2 />
            </Button>
          </Tooltip> */}

          <Modal
            open={calendarOpen}
            onOk={handleDate}
            onCancel={
              // setCalendarOpen(false)
              handleDate
            
            }
          >
            <Form className='m-3'>
              <FormItem>
                <Input type='date' placeholder='Date' name='date' onChange={handleDateChange} className='m-2 w-100'
                />
              </FormItem>
            </Form>
          </Modal>


          <Layout className='px-0 px-md-2 content-layout'>
            <Header className='content-header p-0 mb-4'>
              <h1>Sticky Wall</h1>
              <FormItem>
                <div className='d-flex align-items-center'>
                <Input type='date' placeholder='Date' name='date' value={dateSelected} onChange={handleDateChange} className='d-inline'
                />
                <Button className='ms-2' onClick={handleDate}>
              <AiOutlineSearch />
                </Button>
                </div>
              </FormItem>
            </Header>
            <Content className='wall rounded p-1 p-sm-3'>
            {loading
        ? <>
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
        </>
        : <>     
          {notesFromFirebase.map((note) => {
            const randomBgColor = colorList[(Math.floor(Math.random() * colorList.length))]
            const { id } = note
            return <>
              <div key={id} className='col-12 col-sm-6 col-md-4 col-lg-3'>
                <div className="note-card rounded shadow mb-3 me-1 m-sm-2 m-md-3" style={{
                  background: randomBgColor
                }}>

                  <Dropdown className='float-end bg-transparent border-0 p-0 text-3'
                    menu={

                      {
                        items: [
                          {
                            key: '1',
                            icon: <FaEdit />,
                            label: (
                              <a onClick={() => { handleEdit(note) }}>
                                Edit
                              </a>)

},
{
                            key: '2',
                            icon: <AiTwotoneDelete />,
                            label: (<>

                              {!deleting
                                ? <a onClick={() => { handleDelete(note.id) }}> Delete </a>
                                : <AiOutlineLoading />
                                // <div className="spinner-grow m-0 text-warning" role="status">
                                // </div>
                              }

                            </>
                            )
                          }
                        ]
                      }
                    }
                    // onClick={()=>{setMenuOpen(!menuOpen)}}
                    // open= {menuOpen}
                    placement="bottomRight">
                    <button className="ellipsis-button">
                      <AiOutlineBars />
                    </button>
                  </Dropdown>
                  <p className='p-0 m-0'><b><u>Title</u></b></p>
                  {note.title}
                  <p className='p-0 m-0' ><b><u>Description</u></b></p>
                  {note.description}
                  <p className='p-0 m-0' ><b><u>Location</u></b></p>
                  {note.location}
                  <p className='p-0 m-0' ><b><u>Date</u></b></p>
                  {note.date}
                  <p className='p-0 m-0' ><b><u>List</u></b></p>
                  {note.listType}
                  <p className='p-0 m-0' ><b><u>Status</u></b></p>
                  {note.status}
                </div>
              </div>


            </>
          })
        }
          {toAdd &&
            <AddCard setToAdd={setToAdd} setEdit={setEdit} fromFireStore={fromFireStore} listTypesFromFireStore={listTypesFromFireStore} />
          }
          <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div onClick={add}>
              <div className="addCard shadow rounded mb-3 me-1 m-sm-2 m-md-3">
                <GrAdd className='add' />
              </div>
            </div>
          </div>
          {edit &&
            <AddCard setToAdd={setToAdd} edit={edit} noteToBeUpdated={noteToBeUpdated} listTypesFromFireStore={listTypesFromFireStore} setEdit={setEdit} fromFireStore={fromFireStore} />
          }
        </>
      }
      </Content>
      </Layout>
    </>
  )
}