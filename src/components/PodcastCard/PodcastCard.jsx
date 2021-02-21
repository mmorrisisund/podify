import { Link } from 'react-router-dom'

export const PodcastCard = ({ id, image, title, author }) => {
  return (
    <div className='w-56 m-8 transition-colors rounded bg-true-gray-800 h-72 hover:bg-true-gray-700'>
      <Link to={`/podcasts/${id}`}>
        <div className='flex flex-col p-4'>
          <img className='w-48 h-48 rounded-lg' src={image} alt={title} />
          <div className='mt-4'>
            <h3 className='text-sm font-semibold tracking-wide truncate text-true-gray-50'>
              {title}
            </h3>
            <span className='text-xs text-true-gray-300'>{author}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
