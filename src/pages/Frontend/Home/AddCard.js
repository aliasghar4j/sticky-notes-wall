import { Form, Modal, Input, Space, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { firestore } from 'config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { auth } from '../../../config/firebase'

export default function AddCard({ setToAdd, edit, setEdit, fromFireStore , noteToBeUpdated , listTypesFromFireStore}) {
  const [open, setOpen] = useState(true)
  const [note, setNote] = useState({ id: '' })
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editedNote, setEditedNote] = useState({...noteToBeUpdated})
  const [addingList, setAddingList] = useState(false)

  const [listTypes, setListTypes] = useState([{ value: 'Personal', label: 'Personal', }, { value: 'Work', label: 'Work' } , ...listTypesFromFireStore ])
  const [listType, setListType] = useState('Personal')
  const [newListType, setNewListType] = useState('')
  const [addListModal, setAddListModal] = useState(false)

  const handleChange = (e) => {
    !edit 
    ? setNote({ ...note, [e.target.name]: e.target.value })
    : setEditedNote({...editedNote, [e.target.name]: e.target.value})
  }
  const handleListType = (e) => {
    setListType(e)
  }
  const handleAdd = async () => {
    setConfirmLoading(true)
    const letId = Math.random().toString(36).slice(2, 10)
    const updatedNote = { ...note, id: letId, uid: auth.currentUser.uid, listType }

    try {
      const docRef = doc(firestore, "notes", updatedNote.id)
      await setDoc(docRef, updatedNote);
      console.log("Document written with ID: ", updatedNote.id);
      setConfirmLoading(false)
      setOpen(false)
      fromFireStore()

    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setToAdd(false)
  }
  const handleUpdate = async () => {
    setConfirmLoading(true)
    const noteId = editedNote.id 
    const newEditedNote = {...editedNote, listType}
    try {
      const docRef = doc(firestore, "notes", noteId)
      await setDoc(docRef, newEditedNote);
      console.log("Document written with ID: ", noteId);
      setConfirmLoading(false)
      setOpen(false)
      fromFireStore()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setEdit(false)
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
    setListType(newList.value)
    try {
      const docRef = doc(firestore, "lists", newList.value)
      await setDoc(docRef, newList);
      console.log("Document written with ID: ", newList);
      setAddingList(false)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNewListType('');
    setAddListModal(false)
    }
  }
  const handleListModal = () => {
    setAddListModal(true)
  }
  return (
    <>
      <Modal
        open={open}
        okText={!edit ? 'Add Note' : 'Update Note'}
        onOk={!edit ? handleAdd : handleUpdate}
        confirmLoading={confirmLoading}
        cancelText={'Close'}
        onCancel={() => {
          setOpen(false)
          setToAdd(false)
          setEdit(false)
        }
        }
      >
        <Form className='m-3'>
          <FormItem>
            <Input type='text' placeholder='Title' name='title' onChange={handleChange} className='' 
            value={edit ? editedNote.title : note.title}/>
          </FormItem>
          <FormItem>
            <Input type='location' placeholder='Location' name='location' onChange={handleChange} className='' 
            value={edit ? editedNote.location : note.location}/>
          </FormItem>
          <FormItem>
            <Input type='text' placeholder='Description' name='description' onChange={handleChange} className='' 
            value={edit ? editedNote.description : note.description}/>
          </FormItem>
          <FormItem>
            <Input type='date' placeholder='Date' name='date' onChange={handleChange} className='my-1 w-100' 
            value={edit ? editedNote.date : note.date}/>
          </FormItem>

          <FormItem>
            <Space wrap>
              <Select
                value={edit ? editedNote.listType : listType}
                style={{
                  width: 120,
                }}
                onChange={handleListType}
                options={[...listTypes,
                {
                  value: '',
                  label: (
                    <button className='btn btn-info py-0' onClick={handleListModal}>
                      Add List
                    </button>
                  ),
                },
                ]
                }
              />
              <Modal
                title="Add List Type"
                open={addListModal}
                onOk={addNewListType}
                confirmLoading={addingList}
                onCancel={()=>setAddListModal(false)}
              >
                <Input
                  value={newListType}
                  onChange={(e) => setNewListType(e.target.value)}
                  placeholder="Enter List Type"
                />
              </Modal>
            </Space>
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}
