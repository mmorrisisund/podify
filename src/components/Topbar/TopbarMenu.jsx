import { Menu, Transition } from '@headlessui/react'

import { User, ArrowDown, ArrowUp } from '../Icons'
import { useAuth } from '../../providers/auth'

export const TopbarMenu = () => {
  const { logout, user } = useAuth()

  return (
    <Menu as='div' className='pointer-events-auto'>
      {({ open }) => (
        <>
          <Menu.Button className='flex items-center h-8 p-0.5 transition-colors bg-black rounded-full hover:bg-true-gray-800'>
            <div className='flex items-center justify-center rounded-full w-7 h-7 bg-true-gray-700'>
              <User className='w-4 h-4 text-white' />
            </div>
            <span className='mx-2 font-medium text-white'>
              {user?.display_name}
            </span>
            <div className='flex items-center justify-center pr-2 w-7 h-7'>
              {open ? (
                <ArrowUp className='w-4 h-4 text-white' />
              ) : (
                <ArrowDown className='w-4 h-4 text-white' />
              )}
            </div>
          </Menu.Button>
          <Transition show={open} className='relative'>
            <Menu.Items
              static
              className='absolute w-32 p-1 rounded-sm shadow-md top-2 right-1 bg-true-gray-800 text-true-gray-50 focus:outline-none'
            >
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={`p-2 transition-colors ${
                        active
                          ? 'text-true-gray-50 bg-true-gray-700'
                          : 'text-true-gray-300'
                      } `}
                    >
                      Account
                    </p>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={`p-2 transition-colors ${
                        active
                          ? 'text-true-gray-50 bg-true-gray-700'
                          : 'text-true-gray-300'
                      } `}
                    >
                      Profile
                    </p>
                  )}
                </Menu.Item>
                <hr className='mt-1 border-true-gray-600' />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`w-full text-left p-2 transition-colors ${
                        active
                          ? 'text-true-gray-50 bg-true-gray-700'
                          : 'text-true-gray-300'
                      } `}
                    >
                      Log out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
