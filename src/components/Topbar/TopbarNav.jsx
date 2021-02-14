import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc'

export const TopbarNav = () => {
  return (
    <div className='space-x-4 pointer-events-auto'>
      <button className='w-8 h-8 p-1 bg-black rounded-full'>
        <VscChevronLeft className='w-6 h-6 text-white' />
      </button>
      <button className='w-8 h-8 p-1 bg-black rounded-full'>
        <VscChevronRight className='w-6 h-6 text-white' />
      </button>
    </div>
  )
}
