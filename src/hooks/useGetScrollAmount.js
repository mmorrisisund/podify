import { useState, useEffect } from 'react'

export const useGetScrollAmount = ({ elRef }) => {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const refCopy = elRef
    const handleScroll = e => {
      setScrollTop(elRef.current.scrollTop)
    }
    if (elRef?.current) {
      elRef.current.addEventListener('scroll', handleScroll)
    }

    return () => refCopy.current?.removeEventListener('scroll', handleScroll)
  }, [elRef])

  return scrollTop
}
