import './DeleteModal.css'
export function DeleteModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>Are you sure you want to delete this reservation?</p>
        <div className='modal-actions'>
          <button className='cancel' onClick={onCancel}>
            Cancel
          </button>
          <button className='delete' onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
