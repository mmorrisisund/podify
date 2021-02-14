import { useState, useRef, forwardRef, useEffect, useCallback } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

function unfocus (document, window) {
  if (document.selection) {
    document.selection.empty()
  } else {
    try {
      window.getSelection().removeAllRanges()
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

export default function SplitPane ({
  children,
  className,
  min = 1,
  max = Number.POSITIVE_INFINITY,
  ...props
}) {
  const [size, setSize] = useLocalStorage('podify-nav-width', null)
  const [position, setPosition] = useState(undefined)
  const splitPaneRef = useRef()
  const leftPaneRef = useRef()

  const onMouseDown = useCallback(e => {
    setPosition(e.clientX)
    unfocus(document, window)
  }, [])

  const onMouseMove = useCallback(
    e => {
      if (!position) return

      unfocus(document, window)

      if (leftPaneRef.current?.getBoundingClientRect) {
        const size = leftPaneRef.current.getBoundingClientRect().width
        const current = e.clientX
        const positionDelta = position - current
        const sizeDelta = positionDelta
        let newSize = size - sizeDelta
        const newPosition = position - positionDelta

        if (newSize > min && newSize < max) {
          setPosition(newPosition)
          setSize(newSize)
        }
      }
    },
    [setSize, min, max, position]
  )

  const onMouseUp = useCallback(() => setPosition(undefined), [])

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove, onMouseUp])

  return (
    <div {...props} className={`flex ${className ?? ''}`} ref={splitPaneRef}>
      <Pane ref={leftPaneRef} size={size}>
        {children[0]}
      </Pane>
      <Resizer onMouseDown={onMouseDown} />
      <Pane>{children[1]}</Pane>
    </div>
  )
}

const Pane = forwardRef(({ size, children }, ref) => {
  return (
    <div
      ref={ref}
      className={`${size ? 'flex-none' : 'flex-1'} relative outline-none`}
      style={{ width: size }}
    >
      {children}
    </div>
  )
})

const Resizer = ({ onMouseDown }) => {
  return (
    <span
      className='w-2 transition-colors bg-black border-4 border-black hover:bg-gray-100 cursor-col-resize'
      onMouseDown={onMouseDown}
    />
  )
}
