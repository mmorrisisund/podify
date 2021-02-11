import {
  useState,
  createContext,
  useRef,
  useContext,
  useEffect,
  useCallback
} from 'react'
import clamp from '../../utils/clamp'

const splitPaneContext = createContext()

export default function SplitPane ({
  children,
  className,
  min = 1,
  max = 500,
  ...props
}) {
  const [leftWidth, setLeftWidth] = useState(null)
  const separatorXPosition = useRef()
  const splitPaneRef = useRef()

  const onMouseDown = useCallback(e => {
    separatorXPosition.current = e.clientX
  }, [])

  const onMouseMove = useCallback(
    e => {
      if (!separatorXPosition.current) return

      const newLeftWidth = e.clientX - separatorXPosition.current + leftWidth
      separatorXPosition.current = e.clientX

      setLeftWidth(clamp(newLeftWidth, min, max))
    },
    [leftWidth, min, max]
  )

  const onMouseUp = useCallback(() => (separatorXPosition.current = null), [])

  useEffect(() => {
    if (leftWidth) return

    const width = localStorage.getItem('podify-nav-width')
    if (width) {
      setLeftWidth(width)
    }
  }, [leftWidth])

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove, onMouseUp])

  useEffect(() => {
    localStorage.setItem('podify-nav-width', leftWidth)
  }, [leftWidth])

  return (
    <div {...props} className={`flex ${className ?? ''}`} ref={splitPaneRef}>
      <splitPaneContext.Provider value={{ leftWidth, setLeftWidth }}>
        {children[0]}
        <div
          className='w-2 transition-colors bg-black border-4 border-black hover:bg-gray-100 cursor-col-resize'
          onMouseDown={onMouseDown}
        />
        {children[1]}
      </splitPaneContext.Provider>
    </div>
  )
}

SplitPane.Left = function SplitPaneLeft ({ children, className, ...props }) {
  const { leftWidth, setLeftWidth } = useContext(splitPaneContext)
  const leftRef = useRef()

  useEffect(() => {
    if (!leftWidth) {
      setLeftWidth(leftRef.current.clientHeight)
      return
    }

    leftRef.current.style.width = `${leftWidth}px`
  }, [leftWidth, setLeftWidth])

  return (
    <div
      {...props}
      className={`overflow-hidden ${
        leftWidth ? 'flex-none' : 'flex-1'
      } ${className ?? ''}`}
      ref={leftRef}
    >
      {children}
    </div>
  )
}

SplitPane.Right = function SplitPaneRight ({ children, className, ...props }) {
  return (
    <div {...props} className={`flex-1 overflow-hidden ${className ?? ''}`}>
      {children}
    </div>
  )
}
