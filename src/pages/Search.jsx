import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { search, debounce } from '../utils'
import { PodcastCard } from '../components/PodcastCard'

const doSearch = debounce(async function doSearch (term, cb) {
  const result = await search(term)
  cb(result)
})

export const Search = () => {
  const [result, setResult] = useState()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/search' && location.pathname !== '/search/') {
      doSearch(location.pathname.slice(8), setResult)
    }
  }, [location.pathname])

  return (
    <div className='flex flex-wrap min-h-full py-24 bg-true-gray-900'>
      {result?.shows?.items?.map?.(show => (
        <PodcastCard key={show.id} podcast={show} />
      ))}
    </div>
  )
}
