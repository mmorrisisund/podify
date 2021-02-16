import { Link } from 'react-router-dom'

export const EpisodeCard = ({ title, date, description, image, duration }) => {
  return (
    <li className='h-48 max-w-xl p-4 rounded-sm bg-true-gray-900 hover:bg-true-gray-700'>
      <Link>
        <div className='flex flex-col'>
          <div className='flex items-center ml-3'>
            <img src={image} alt={title} className='w-16 h-16' />
            <h3 className='ml-3 text-lg text-true-gray-50'>{title}</h3>
          </div>
          <p className='mt-3 mb-4 text-sm text-true-gray-400'>{description}</p>
          <div className='flex items-center space-x-2 text-true-gray-400'>
            <button className='text-white'>Play</button>
            <span>date</span>
            <span>{`${duration}`}</span>
          </div>
        </div>
      </Link>
    </li>
  )
}
