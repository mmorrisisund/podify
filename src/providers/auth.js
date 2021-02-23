import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const localUserJson = localStorage.getItem('user')
  const localUser = localUserJson && JSON.parse(localUserJson)
  const [user, setUser] = useState(localUser)

  const saveUser = user => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const deleteUser = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const signup = user => sendRequest('signup', user, saveUser)
  const login = user => sendRequest('login', user, saveUser)
  const logout = () => sendRequest('logout', undefined, deleteUser)

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('You must wrap useAuth in an AuthProvider')
  }
  return context
}

async function sendRequest (endpoint, body, successCallback) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    }
  }

  if (body) {
    requestOptions.headers['Content-Type'] = 'application/json'
    requestOptions.body = JSON.stringify(body)
  }

  const response = await fetch(
    `/.netlify/functions/${endpoint}`,
    requestOptions
  )

  if (response.ok) {
    const responseBody = await response.json()
    successCallback(responseBody)
  }
}