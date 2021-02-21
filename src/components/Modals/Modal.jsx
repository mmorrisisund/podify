import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export const Modal = ({ onModalClose, children }) => {
  useEffect(() => {
    const handleKeys = e => {
      if (e.keyCode === 27) {
        onModalClose?.()
      }
    }
    document.addEventListener('keydown', handleKeys)

    return () => document.removeEventListener('keydown', handleKeys)
  }, [onModalClose])

  return createPortal(
    <div id='overlay' className='fixed inset-0 bg-semi-transparent'>
      <div id='container' className='w-full h-full'>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  )
}
