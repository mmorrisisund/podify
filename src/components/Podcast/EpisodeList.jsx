import { EpisodeCard } from './EpisodeCard'

export const EpisodeList = ({ episodes }) => {
  return (
    <section className='p-4'>
      <ul>
        {episodes?.map(episode => (
          <EpisodeCard key={episode.title} episode={episode} />
        ))}
      </ul>
    </section>
  )
}
