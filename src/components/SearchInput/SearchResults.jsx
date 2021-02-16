import { Link } from 'react-router-dom'

export const SearchResults = ({ results }) => {
  return (
    <div className='absolute w-full py-2 rounded-sm shadow bg-true-gray-900 text-true-gray-400 top-2'>
      <ul className='divide-y divide-black'>
        {results.map(result => (
          <li>
            <Link
              key={result.collectionId}
              to={`/podcasts/${result.collectionId}`}
              className='flex px-2 py-3 transition-colors rounded-sm hover:bg-gray-700 hover:text-true-gray-50'
            >
              <img src={result.artworkUrl60} alt={result.collectionName} />
              <span className='ml-2 text-lg'>{result.collectionName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
