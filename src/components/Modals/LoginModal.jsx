import { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Modal } from './Modal'
import { SubmitButton, CancelButton } from '../Buttons'

export const LoginModal = ({ onModalClose }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuthContext()

  const handleFormSubmit = e => {
    e.preventDefault()

    const { status, data } = login(email)

    if (status === 'success') {
      onModalClose?.()
    } else {
      setError(data.message)
    }
  }

  return (
    <Modal onModalClose={onModalClose}>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='w-1/3 p-10 bg-black rounded h-1/2'>
          <h2 className='text-3xl font-semibold tracking-widest text-center uppercase text-true-gray-300'>
            Login
          </h2>
          <form
            className='flex flex-col justify-between h-5/6'
            onSubmit={handleFormSubmit}
          >
            <div className='mt-4 space-y-4'>
              <div className='flex flex-col'>
                <label className='capitalize text-true-gray-400'>email</label>
                <input
                  type='email'
                  placeholder='Enter your email'
                  required
                  value={email}
                  onInput={e => setEmail(e.target.value)}
                  className='px-4 py-2 mt-4 placeholder-current border rounded-md bg-true-gray-800 text-gray-50'
                />
              </div>
            </div>
            <div>
              {error && (
                <span className='text-red-100 bg-red-500'>{error}</span>
              )}
            </div>
            <div className='flex justify-end space-x-4'>
              <CancelButton onClick={() => onModalClose?.()} />
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}
