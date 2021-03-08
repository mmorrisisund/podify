import cn from 'classnames'
import { Forward, Next, Pause, Play, Previous, Replay } from '../Icons'

export const PlayerControls = ({
  className,
  onReplay,
  onForward,
  onSkipPrevious,
  onSkipNext,
  onPause,
  onPlay,
  playing,
  disabled
}) => {
  return (
    <div className={className}>
      <div className='flex items-center justify-center space-x-5'>
        <button
          className='flex items-center justify-center w-8 h-8'
          onClick={() => onSkipPrevious?.()}
        >
          <Previous
            className={cn({
              'w-4 h-4 text-true-gray-300 transition ease-in-out rounded-full': true,
              'hover:text-true-gray-100 cursor-pointer': !disabled,
              'text-true-gray-500 cursor-not-allowed': disabled
            })}
          />
        </button>
        <button
          className='flex items-center justify-center w-8 h-8'
          onClick={() => onReplay?.()}
        >
          <Replay
            className={cn({
              'w-4 h-4 text-true-gray-300 transition ease-in-out rounded-full': true,
              'hover:text-true-gray-100 cursor-pointer': !disabled,
              'text-true-gray-500 cursor-not-allowed': disabled
            })}
          />
        </button>

        <button
          className='flex items-center justify-center w-8 h-8 rounded-full bg-true-gray-100'
          onClick={() => (playing ? onPause?.() : onPlay?.())}
        >
          {playing ? (
            <Pause
              className={cn({
                'w-4 h-4 text-true-gray-900 transition ease-in-out': true,
                ' cursor-pointer': !disabled,
                'text-true-gray-500 cursor-not-allowed': disabled
              })}
            />
          ) : (
            <Play
              className={cn({
                'w-4 h-4 text-true-gray-900 transition ease-in-out': true,
                ' cursor-pointer': !disabled,
                'text-true-gray-500 cursor-not-allowed': disabled
              })}
            />
          )}
        </button>
        <button
          className='flex items-center justify-center w-8 h-8'
          onClick={() => onForward?.()}
        >
          <Forward
            className={cn({
              'w-4 h-4 text-true-gray-300 transition ease-in-out rounded-full': true,
              'cursor-pointer hover:text-true-gray-100': !disabled,
              'text-true-gray-500 cursor-not-allowed': disabled
            })}
          />
        </button>
        <button
          className='flex items-center justify-center w-8 h-8'
          onClick={() => onSkipNext?.()}
        >
          <Next
            className={cn({
              'w-4 h-4 text-true-gray-300 transition ease-in-out rounded-full': true,
              'cursor-pointer hover:text-true-gray-100': !disabled,
              'cursor-not-allowed text-true-gray-500': disabled
            })}
          />
        </button>
      </div>
    </div>
  )
}
