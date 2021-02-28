import { useQuery, useInfiniteQuery } from 'react-query'
import { getShow, getShowEpisodes, checkUserShows } from '../utils'

export const usePodcast = id => {
  return useQuery(['podcast', id], () => getShow(id))
}

export const useShowEpisodes = (id, initialData) => {
  return useInfiniteQuery(
    ['episodes', id],
    ({ pageParam = 0 }) => getShowEpisodes(id, 50, pageParam),
    {
      initialData,
      getNextPageParam: (lastPage, pages) =>
        lastPage.next && lastPage.offset + 50
    }
  )
}

export const useFollowStatus = id => {
  return useQuery(['followStatus', id], () => checkUserShows(id))
}
