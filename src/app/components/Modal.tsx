import { FC } from "react"

interface ModalProps {
  modalOpen: boolean,
  setModalOpen: (open: boolean) => boolean | void
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <>
      <dialog className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <button
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Modal
