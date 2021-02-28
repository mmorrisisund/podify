import { useHistory } from 'react-router-dom'
import { SearchInput } from './SearchInput'

export const SearchBar = () => {
  const history = useHistory()

  const handleOnInput = term => {
    history.replace(`/search/${term}`)
  }

  return <SearchInput onInput={handleOnInput} />
}
