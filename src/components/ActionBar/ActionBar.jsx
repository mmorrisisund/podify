import { useMutation, useQueryClient } from 'react-query'

import { FollowButton } from '../Buttons'
import { PlayButton } from '../Buttons/Play'
import { useParams } from 'react-router-dom'
// import { usePlayContext } from '../../context/PlayContext'
import { useFollowStatus } from '../../hooks/queries'
import { addUserShows, removeUserShows } from '../../utils/spotifyApi'

export const ActionBar = () => {
  const { podcastId } = useParams()
  const queryClient = useQueryClient()
  const follow = useMutation(id => addUserShows(id), {
    onSettled: () => queryClient.invalidateQueries('followStatus')
  })
  const unfollow = useMutation(id => removeUserShows(id), {
    onSettled: () => queryClient.invalidateQueries('followStatus')
  })
  const { data, isLoading, isError } = useFollowStatus(podcastId)
  let isFollowing = data?.[0]
  // const [{ podcast }, dispatch, actions] = usePlayContext()

  const handleFollowOnClick = async () => {
    if (isFollowing) {
      unfollow.mutate(podcastId)
    } else {
      follow.mutate(podcastId)
    }
  }

  const handlePlayClick = () => {}

  return (
    <div className='flex items-center h-24 px-8 bg-red-600 bg-gradient-to-t from-true-gray-900 to-semi-transparent'>
      <div className='flex items-center'>
        <PlayButton
          className='p-4 mr-10 rounded-full bg-lime-600 h-14 w-14 text-green-50'
          onPlay={handlePlayClick}
        />
        {!isLoading && !isError && (
          <FollowButton
            isFollowing={isFollowing}
            onClick={handleFollowOnClick}
          />
        )}
      </div>
    </div>
  )
}
