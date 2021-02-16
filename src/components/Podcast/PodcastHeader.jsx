export const PodcastHeader = ({ image, name, artist }) => {
  return (
    <div className='relative flex items-end px-8 py-6 h-96'>
      <div className='absolute inset-0 bg-red-600 h-96 bg-gradient-to-t from-semi-transparent' />
      <div className='relative flex items-end'>
        <img src={image} alt={name} className='w-56 h-56 rounded-lg' />
        <div className='ml-4 text-white'>
          <h2 className='text-5xl font-bold tracking-tighter'>{name}</h2>
          <h3 className='mt-3 text-2xl font-semibold'>{artist}</h3>
        </div>
      </div>
    </div>
  )
}
