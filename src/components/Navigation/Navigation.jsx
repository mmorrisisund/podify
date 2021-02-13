import { NavLink } from 'react-router-dom'
import { VscHome, VscLibrary } from 'react-icons/vsc'
import { FiSearch } from 'react-icons/fi'

export const Navigation = ({ className }) => {
  return (
    <div className={className}>
      <ul className='flex flex-col px-6 -mx-4'>
        <li className='text-gray-400 '>
          <NavLink
            className='flex items-center justify-start px-4 py-2 transition-colors duration-300 group'
            activeClassName='text-gray-100 bg-gray-700 rounded w-full'
            to='/'
            exact
          >
            <VscHome className='w-6 h-6 transition duration-300 group-hover:text-gray-100' />
            <p className='ml-4 font-medium transition duration-300 group-hover:text-gray-100'>
              Home
            </p>
          </NavLink>
        </li>
        <li className='text-gray-400 '>
          <NavLink
            className='flex items-center justify-start px-4 py-2 transition-colors duration-300 group'
            activeClassName='text-gray-100 bg-gray-700 rounded w-full'
            to='/search'
            exact
          >
            <FiSearch className='w-6 h-6 transition duration-300 group-hover:text-gray-100' />
            <p className='ml-4 font-medium transition duration-300 group-hover:text-gray-100'>
              Search
            </p>
          </NavLink>
        </li>
        <li className='text-gray-400 '>
          <NavLink
            className='flex items-center justify-start px-4 py-2 transition-colors duration-300 group'
            activeClassName='text-gray-100 bg-gray-700 rounded w-full'
            to='/library'
            exact
          >
            <VscLibrary className='w-6 h-6 transition duration-300 group-hover:text-gray-100' />
            <p className='ml-4 font-medium transition duration-300 group-hover:text-gray-100'>
              Library
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
