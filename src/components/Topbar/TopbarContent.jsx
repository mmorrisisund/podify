import { Switch, Route } from 'react-router-dom'
import { SearchBar } from '../SearchInput'

export const TopbarContent = () => {
  return (
    <div className='flex-1 ml-4 pointer-events-auto'>
      <Switch>
        <Route path='/search' component={SearchBar} />
      </Switch>
    </div>
  )
}
