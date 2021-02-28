import { useShowEpisodes } from '../../hooks/queries'
import { EpisodeCard } from '../EpisodeCard/EpisodeCard'

export const EpisodeList = ({ podcastId }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useShowEpisodes(
    podcastId
  )

  return (
    <section className='p-4'>
      <div className='flex flex-col'>
        <div>
          {!isLoading &&
            data.pages.map(page => {
              return page.items.map(episode => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))
            })}
        </div>
        {hasNextPage && (
          <button
            onClick={fetchNextPage}
            className='p-4 mx-auto text-white bg-black rounded'
          >
            {isLoading ? 'Loading...' : 'More'}
          </button>
        )}
      </div>
    </section>
  )
}
