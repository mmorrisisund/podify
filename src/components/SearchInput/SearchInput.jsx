import { useState } from 'react'
import { Search } from '../Icons'

export const SearchInput = ({ onInput, delay = 0 }) => {
  const [term, setTerm] = useState('')

  const handleOnInput = e => {
    setTerm(e.target.value)
    onInput?.(e.target.value)
  }

  return (
    <div className='relative max-w-sm'>
      <input
        type='text'
        className='w-full px-10 rounded-full pointer-events-auto'
        placeholder='Search for a new podcast'
        value={term}
        onInput={handleOnInput}
      />
      <div className='absolute inset-y-0 flex items-center pointer-events-none inset-x-3'>
        <span className='flex items-center justify-center'>
          <Search className='w-6 h-6' />
        </span>
      </div>
    </div>
  )
}
