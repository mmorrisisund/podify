import { useState, useEffect, useRef } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Topbar } from '../Topbar'
import { Home, Search, Library, Podcast } from '../../pages'

export const MainView = () => {
  const mainRef = useRef()
  const topRef = useRef()
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const refCopy = mainRef
    const handleScroll = e => {
      if (
        topRef.current.clientHeight * 2 < mainRef.current.scrollTop &&
        opacity >= 1
      ) {
        return
      }

      setOpacity(mainRef.current.scrollTop / (topRef.current.clientHeight * 2))
    }
    mainRef.current?.addEventListener('scroll', handleScroll)

    return () => refCopy.current?.removeEventListener('scroll', handleScroll)
  }, [mainRef, opacity])

  return (
    <div className='relative'>
      <Topbar ref={topRef} backgroundOpacity={opacity} />
      <main
        ref={mainRef}
        className='h-screen pb-24 overflow-auto bg-true-gray-500'
      >
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/search' component={Search} />
          <Route path='/library' component={Library} />
          <Route path='/podcasts/:podcastId' component={Podcast} />
        </Switch>
      </main>
    </div>
  )
}
