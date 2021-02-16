import { EpisodeCard } from './EpisodeCard'

export const EpisodeList = ({ episodes }) => {
  return (
    <section className='p-4'>
      <ul>
        {episodes?.map(episode => (
          <EpisodeCard
            key={episode.title}
            title={episode.title}
            date={episode.isoDate}
            image={episode.itunes.image}
            description={episode.contentSnippet}
            duration={episode.itunes.duration}
          />
        ))}
      </ul>
    </section>
  )
}
