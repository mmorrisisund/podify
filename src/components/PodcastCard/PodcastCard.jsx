import { Link } from 'react-router-dom'
import { PlayButton } from '../Buttons'

export const PodcastCard = ({ podcast, onPlay }) => {
  const { id, name, publisher, images } = podcast

  const handleOnPlay = e => {
    e.preventDefault()
    onPlay?.(id)
  }
  return (
    <div className='relative w-56 m-8 transition-colors duration-300 rounded group bg-true-gray-800 h-72 hover:bg-true-gray-700'>
      <Link to={`/podcasts/${id}`}>
        <div className='flex flex-col p-4'>
          <img
            className='w-48 h-48 rounded-lg'
            src={images[1].url}
            alt={name}
          />
          <div className='mt-4'>
            <h3 className='text-sm font-semibold tracking-wide truncate text-true-gray-50'>
              {name}
            </h3>
            <span className='text-xs text-true-gray-300'>{publisher}</span>
          </div>
        </div>
        <div className='absolute bottom-24 right-8'>
          <PlayButton
            className='p-4 transition duration-300 transform translate-y-4 rounded-full opacity-0 h-14 w-14 bg-lime-600 text-lime-50 group-hover:opacity-100 group-hover:translate-y-0'
            onPlay={handleOnPlay}
          />
        </div>
      </Link>
    </div>
  )
}
