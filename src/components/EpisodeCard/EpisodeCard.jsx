import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { PlayButton } from '../Buttons/Play'
import { play } from '../../utils/spotifyPlayer'
const toMinutes = ms => Math.ceil(ms / 1000 / 60)

export const EpisodeCard = ({ episode }) => {
  const {
    description,
    duration_ms,
    images: [, md],
    name,
    release_date,
    uri
  } = episode

  const handleOnClickPlay = e => {
    e.preventDefault()
    play(uri)
  }

  return (
    <li className='h-48 max-w-3xl px-4 list-none rounded-sm bg-true-gray-900 hover:bg-true-gray-700'>
      <hr className='border-true-gray-700' />
      <Link to='/#'>
        <div className='flex items-center h-full border-true-gray-700'>
          <div className='flex-shrink-0'>
            <img src={md?.url} alt={name} className='rounded-lg w-28 h-28' />
          </div>
          <div className='flex-grow w-3/4 pl-6 pr-4'>
            <h3 className='font-medium text-true-gray-50'>{name}</h3>
            <p className='mt-3 mb-4 text-sm line-clamp-2 text-true-gray-400'>
              {description}
            </p>
            <div className='flex items-center space-x-2 text-true-gray-400'>
              <PlayButton
                onPlay={handleOnClickPlay}
                className='w-8 h-8 p-2 rounded-full bg-true-gray-50 text-true-gray-900'
              />
              <span>{format(new Date(release_date), 'LLL d')}</span>
              <span>{`${toMinutes(duration_ms)} min`}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
