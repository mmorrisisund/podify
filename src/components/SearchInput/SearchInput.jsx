import { Search } from '../Icons'
import { useSearch } from '../../context/SearchContext'
import { useState } from 'react'
import { debounce } from '../../utils/debounce'
import { searchByTerm } from '../../utils/itunesApi.js'
import { map, pick, pipe, slice } from 'ramda'
import { SearchResults } from './SearchResults'

const searchPodcast = debounce(searchByTerm)
const getPodcastInfo = pipe(
  map(pick(['artworkUrl60', 'collectionName', 'collectionId'])),
  slice(0, 5)
)

const runSetter = setter => value => setter(value)

export const SearchInput = () => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const { setSearch } = useSearch()

  const handleOnInput = e => {
    if (e.target.value) {
      searchPodcast(e.target.value, pipe(getPodcastInfo, runSetter(setResults)))
    } else {
      setResults([])
    }
    setTerm(e.target.value)
    setSearch(e.target.value)
  }

  return (
    <div className='relative max-w-sm'>
      <input
        type='text'
        className='w-full px-10 rounded-full pointer-events-auto'
        placeholder='Search for a new podcast'
        value={term}
        onInput={handleOnInput}
      />
      <div className='absolute inset-y-0 flex items-center pointer-events-none inset-x-3'>
        <span className='flex items-center justify-center'>
          <Search className='w-6 h-6' />
        </span>
      </div>

      {results.length ? (
        <div className='relative'>
          <SearchResults results={results} />{' '}
        </div>
      ) : null}
    </div>
  )
}
