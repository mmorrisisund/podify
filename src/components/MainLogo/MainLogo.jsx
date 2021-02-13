import { SiSpotify } from 'react-icons/si'

export const MainLogo = ({ className }) => (
  <div className={className}>
    <div className='flex items-center w-full justify-centers'>
      <div className='text-gray-50'>
        <SiSpotify className='w-10 h-10 stroke-current' />
      </div>
      <h1 className='ml-2 text-3xl font-medium text-gray-50'>Podify</h1>
    </div>
  </div>
)
