import cn from 'classnames'
import {
  MdPlayArrow,
  MdPause,
  MdForward30,
  MdReplay10,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md'

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
        <MdSkipPrevious
          className={cn({
            'w-10 h-10 text-true-gray-300 transition ease-in-out rounded-full': true,
            'hover:text-true-gray-100 cursor-pointer': !disabled,
            'text-true-gray-500 cursor-not-allowed': disabled
          })}
          onClick={() => onSkipPrevious?.()}
        />
        <MdReplay10
          className={cn({
            'w-9 h-9 text-true-gray-300 transition ease-in-out rounded-full': true,
            'hover:text-true-gray-100 cursor-pointer': !disabled,
            'text-true-gray-500 cursor-not-allowed': disabled
          })}
          onClick={() => onReplay?.()}
        />
        {playing ? (
          <MdPause
            className={cn({
              'w-16 h-16 text-true-gray-100 transition ease-in-out rounded-full': true,
              ' cursor-pointer': !disabled,
              'text-true-gray-500 cursor-not-allowed': disabled
            })}
            onClick={() => onPause?.()}
          />
        ) : (
          <MdPlayArrow
            className={cn({
              'w-16 h-16 text-true-gray-100 transition ease-in-out rounded-full': true,
              ' cursor-pointer': !disabled,
              'text-true-gray-500 cursor-not-allowed': disabled
            })}
            onClick={() => onPlay?.()}
          />
        )}
        <MdForward30
          className={cn({
            'w-9 h-9 text-true-gray-300 transition ease-in-out rounded-full': true,
            'cursor-pointer hover:text-true-gray-100': !disabled,
            'text-true-gray-500 cursor-not-allowed': disabled
          })}
          onClick={() => onForward?.()}
        />
        <MdSkipNext
          className={cn({
            'w-10 h-10 text-true-gray-300 transition ease-in-out rounded-full': true,
            'cursor-pointer hover:text-true-gray-100': !disabled,
            'cursor-not-allowed text-true-gray-500': disabled
          })}
          onClick={() => onSkipNext?.()}
        />
      </div>
    </div>
  )
}
