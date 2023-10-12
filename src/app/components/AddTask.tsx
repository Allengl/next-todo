'use client'
import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import Modal from './Modal'
import { addTodo } from '../../../api'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')

  const handleSubmitNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    })
    setNewTaskValue('')
    setModalOpen(false)
    router.refresh()
  }
  return (
    <div>
      <button onClick={() => {
        setModalOpen(true)
      }
      } className='btn btn-primary w-full'>Add new task
        <Plus size={24} className='ml-2' />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
         <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-action'>
            <input 
            value={newTaskValue}
              type="text" 
              placeholder='Type here'
              className='input input-bordered w-full'
              onChange={(e) => {setNewTaskValue(e.target.value)}}
            />
            <button type='submit' className='btn'>Add</button>
          </div>
         </form>
      </Modal>
    </div>
  )
}

export default AddTask
