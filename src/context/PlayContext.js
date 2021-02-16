import { createContext, useContext, useReducer } from 'react'

export const PlayContext = createContext()

const SET_PLAYING = 'SET_PLAYING'
const SET_EPISODES = 'SET_EPISODES'
const SET_PODCAST = 'SET_PODCAST'

function reducer (state, { type, payload }) {
  switch (type) {
    case SET_PLAYING: {
      return { ...state, currentEpisode: payload }
    }
    case SET_EPISODES: {
      return { ...state, episodes: payload }
    }
    case SET_PODCAST: {
      return { ...state, podcast: payload }
    }
    default: {
      return state
    }
  }
}

const initialState = {
  currentEpisode: {},
  episodes: [],
  podcast: {}
}

export const PlayProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <PlayContext.Provider value={[state, dispatch]}>
      {children}
    </PlayContext.Provider>
  )
}

export const usePlayContext = () => {
  const value = useContext(PlayContext)

  if (!value) throw Error('usePlayContext must be wrapped in a provider')

  return value
}
