import { useState, createContext, useRef, useContext, useEffect } from 'react'

const splitPaneContext = createContext()

export default function SplitPane ({ children, className, ...props }) {
  const [leftWidth, setLeftWidth] = useState(null)
  const separatorXPosition = useRef()
  const splitPaneRef = useRef()

  const onMouseDown = e => {
    separatorXPosition.current = e.clientX
  }

  const onMouseMove = e => {
    if (!separatorXPosition.current) return

    const newLeftWidth = e.clientX - separatorXPosition.current + leftWidth
    separatorXPosition.current = e.clientX

    if (newLeftWidth < 1) {
      return setLeftWidth(1)
    }

    const splitPaneWidth = splitPaneRef.current.clientWidth
    console.log(newLeftWidth, splitPaneWidth)
    // if (newTopHeight > splitPaneHeight) {
    //   return setTopHeight(splitPaneHeight)
    // }

    setLeftWidth(newLeftWidth)
  }

  const onMouseUp = () => (separatorXPosition.current = null)

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  })

  return (
    <div {...props} className={`flex ${className ?? ''}`} ref={splitPaneRef}>
      <splitPaneContext.Provider value={{ leftWidth, setLeftWidth }}>
        {children[0]}
        <div
          className='-my-2 border-4 border-black cursor-move'
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
