export const MediaDisplay = ({ image, episodeName, artistName }) => {
  return (
    <div className='flex'>
      <div className='flex items-center justify-center flex-shrink-0 object-cover object-center w-24 h-24'>
        <img className='rounded-md' src={image} alt={episodeName} />
      </div>
      <div className='flex flex-col justify-around'>
        <div>
          <p className='text-sm text-gray-100'>{episodeName}</p>
          <p className='text-xs text-gray-200 opacity-75'>{artistName}</p>
        </div>
      </div>
    </div>
  )
}
