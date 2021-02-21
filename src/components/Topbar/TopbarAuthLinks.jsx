import { useState } from 'react'
import { LoginModal } from '../Modals/LoginModal'
import { SignUpModal } from '../Modals/SignUpModal'

export const TopbarAuthLinks = () => {
  const [signUpVisible, setSignUpVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  return (
    <div>
      <div className='flex pointer-events-auto'>
        <button
          className='mr-10 text-xs font-bold tracking-widest uppercase transition transform text-true-gray-50 hover:scale-105'
          onClick={() => setSignUpVisible(true)}
        >
          sign up
        </button>
        <button
          className='px-10 py-3 text-xs font-bold tracking-widest uppercase transition transform rounded-full bg-true-gray-50 hover:scale-105'
          onClick={() => setLoginVisible(true)}
        >
          log in
        </button>
      </div>
      {signUpVisible && (
        <SignUpModal onModalClose={() => setSignUpVisible(false)} />
      )}
      {loginVisible && (
        <LoginModal onModalClose={() => setLoginVisible(false)} />
      )}
    </div>
  )
}
