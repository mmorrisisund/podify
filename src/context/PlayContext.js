import { createContext, useContext, useReducer } from 'react'

export const PlayContext = createContext([])

export const actions = {
  SET_PLAYING: 'SET_PLAYING',
  SET_PODCAST: 'SET_PODCAST',
  QUEUE_ADD: 'QUEUE_ADD',
  QUEUE_REMOVE: 'QUEUE_REMOVE',
  QUEUE_FORWARD: 'QUEUE_FORWARD',
  QUEUE_REVERSE: 'QUEUE_REVERSE',
  QUEUE_EMPTY: 'QUEUE_EMPTY',
  QUEUE_PODCAST: 'QUEUE_PODCAST',
  QUEUE_PLAY: 'QUEUE_PLAY'
}

function reducer (state, { type, payload }) {
  switch (type) {
    case actions.SET_PLAYING: {
      return { ...state, currentEpisode: payload }
    }
    case actions.SET_PODCAST: {
      return { ...state, podcast: payload }
    }
    case actions.QUEUE_ADD: {
      return addToQueue(state, payload)
    }
    case actions.QUEUE_REMOVE: {
      return removeFromQueue(state, payload)
    }
    case actions.QUEUE_EMPTY: {
      return { ...state, queue: [] }
    }
    case actions.QUEUE_PODCAST: {
      return { ...state, queue: payload }
    }
    case actions.QUEUE_PLAY: {
      return { ...state, currentEpisode: state.queue[0] }
    }
    default: {
      return state
    }
  }
}

const initialState = {
  currentEpisode: null,
  podcast: null,
  queue: []
}

export const PlayProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <PlayContext.Provider value={[state, dispatch, actions]}>
      {children}
    </PlayContext.Provider>
  )
}

export const usePlayContext = () => {
  const value = useContext(PlayContext)

  if (!value) throw Error('usePlayContext must be wrapped in a provider')

  return value
}

function addToQueue (state, episode) {
  const { queue } = state
  const existing = queue.find(u => u === episode.enclosure.url)

  if (existing) return

  return { ...state, queue: [...queue, episode] }
}

function removeFromQueue (state, episode) {
  const newQueue = state.queue.filter(
    ep => ep.enclosure.url !== episode.enclosure.url
  )
  return { ...state, queue: newQueue }
}
