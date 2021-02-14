import { forwardRef } from 'react'
import { TopbarMenu } from './TopbarMenu'
import { TopbarNav } from './TopbarNav'

export const Topbar = forwardRef(({ backgroundOpacity }, ref) => {
  return (
    <header ref={ref} className='absolute w-full h-16 pointer-events-none'>
      <Underlay opacity={backgroundOpacity} />
      <Overlay>
        <TopbarNav />
        <TopbarMenu />
      </Overlay>
    </header>
  )
})

const Underlay = ({ opacity }) => (
  <div className='h-full bg-soft-black' style={{ opacity: opacity }} />
)

const Overlay = ({ children }) => (
  <div className='absolute top-0 z-10 flex items-center justify-between w-full h-full py-3 pr-10 pl-7'>
    {children}
  </div>
)
