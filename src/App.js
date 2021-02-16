import SplitPane from './components/SplitPane/SplitPane'
import { NowPlayingBar } from './components/NowPlayingBar'
import { Navigation } from './components/Navigation'
import { MainLogo } from './components/MainLogo/MainLogo'
import { MainView } from './components/MainView'

function App () {
  return (
    <div className='flex flex-col'>
      <SplitPane className='' min={175} max={400}>
        <nav className='h-full bg-black'>
          <MainLogo className='p-6' />
          <Navigation />
        </nav>
        <MainView />
      </SplitPane>

      <footer className='fixed inset-x-0 bottom-0 h-24'>
        <NowPlayingBar />
      </footer>
    </div>
  )
}

export default App
