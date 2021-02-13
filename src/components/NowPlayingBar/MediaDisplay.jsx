export const MediaDisplay = ({ image, episodeName, artistName }) => {
  return (
    <div>
      <div>
        <div className='flex'>
          <div className='flex-shrink-0 object-cover object-center w-24 h-24'>
            <img src={image} alt={episodeName} />
          </div>
          <div className='flex flex-col justify-end p-4'>
            <div className='space-y-2'>
              <p className='text-gray-300'>{episodeName}</p>
              <p className='text-sm tracking-wide text-gray-200 opacity-75'>
                {artistName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
