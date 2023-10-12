'use client'
import { ITask } from "@/types/tasks"
import { FileEdit, Trash2 } from "lucide-react"
import { FC, FormEventHandler, useState } from "react"
import Modal from "./Modal"
import { useRouter } from "next/navigation"
import { deleteTodo, editTodo } from "../../../api"

interface TaskProps {
  task: ITask
}

const Task: FC<TaskProps> = ({ task }) => {
  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await editTodo({
      id: task.id,
      text: taskToEdit,
    })
    setTaskToEdit('')
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeletedTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false)
    router.refresh()
  }

  return (
    <tr key={task.id}>
      <th className="w-full">{task.text}</th>
      <td className="flex gap-5">
        <FileEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action'>
              <input
                value={taskToEdit}
                type="text"
                placeholder='Type here'
                className='input input-bordered w-full'
                onChange={(e) => { setTaskToEdit(e.target.value) }}
              />
              <button type='submit' className='btn'>Edit</button>
            </div>
          </form>
        </Modal>
        <Trash2 onClick={() => setOpenModalDeleted(true)} cursor="pointer" className="text-red-500" size={25} />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => handleDeletedTask(task.id)}
            >Yes</button>
            <button className="btn" onClick={() => setOpenModalDeleted(false)}>No</button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task
