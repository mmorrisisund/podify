import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { usePlayContext } from '../../context/PlayContext'
import { PlayButton } from '../Buttons/Play'

export const EpisodeCard = ({ episode }) => {
  const [, dispatch, actions] = usePlayContext()
  const { title, contentSnippet, itunes } = episode
  const { image, duration } = itunes

  const handleOnClickPlay = e => {
    e.preventDefault()
    dispatch({ type: actions.SET_PLAYING, payload: episode })
  }

  return (
    <li className='h-48 max-w-xl px-4 rounded-sm bg-true-gray-900 hover:bg-true-gray-700'>
      <hr className='border-true-gray-700' />
      <Link to='/#'>
        <div className='flex flex-col border-true-gray-700'>
          <div className='flex items-center mt-4'>
            <img src={image} alt={title} className='w-16 h-16' />
            <h3 className='ml-3 font-medium text-true-gray-50'>{title}</h3>
          </div>
          <p className='mt-3 mb-4 text-sm truncate text-true-gray-400'>
            {contentSnippet}
          </p>
          <div className='flex items-center space-x-2 text-true-gray-400'>
            <PlayButton
              onPlay={handleOnClickPlay}
              className='w-8 h-8 p-2 rounded-full bg-true-gray-50 text-true-gray-900'
            />
            <span>{format(new Date(episode.isoDate), 'LLL d')}</span>
            <span>{`${duration}`}</span>
          </div>
        </div>
      </Link>
    </li>
  )
}
