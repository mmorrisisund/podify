import { FollowButton } from '../Buttons'
import { useAuth } from '../../providers/auth'
import { PlayButton } from '../Buttons/Play'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePlayContext } from '../../context/PlayContext'

export const ActionBar = ({ onFollow }) => {
  const [isFollowing, setIsFollowing] = useState()
  const location = useLocation()
  const { user } = useAuth()
  const [{ podcast }, dispatch, actions] = usePlayContext()

  useEffect(() => {
    if (user) {
      const paths = location.pathname.split('/')
      const id = paths[paths.length - 1]
      const following =
        user.library.find(podcast => podcast === id) !== undefined
      setIsFollowing(following)
    }
  }, [location, user])

  const handlePlayClick = () => {
    dispatch({ type: actions.QUEUE_PODCAST, payload: podcast.items })
    dispatch({ type: actions.QUEUE_PLAY })
  }

  return (
    <div className='flex items-center h-24 px-8 bg-red-600 bg-gradient-to-t from-true-gray-900 to-semi-transparent'>
      <div className='flex items-center'>
        <PlayButton
          className='p-4 mr-10 rounded-full bg-lime-600 h-14 w-14 text-green-50'
          onPlay={handlePlayClick}
        />
        {user && <FollowButton isFollowing={isFollowing} onClick={onFollow} />}
      </div>
    </div>
  )
}
