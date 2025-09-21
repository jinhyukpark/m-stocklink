import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-11/12 max-w-md">
        <div className="p-4">
          {children}
        </div>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default Modal
