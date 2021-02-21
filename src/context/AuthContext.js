import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('podify-user', null)
  const [users, setUsers] = useLocalStorage('podify-all-users', [])

  const isLoggedIn = !!user

  const login = email => {
    const userToLogin = users.find(user => email === user.email)
    setUser(userToLogin)
    const status = !!userToLogin ? 'success' : 'fail'
    const message = !!userToLogin ? undefined : 'User not found'
    return { status, data: { message } }
  }
  const logout = () => setUser(null)

  const signUp = ({ email, username }) => {
    const existingUser = users.find(user => email === user.email)

    if (existingUser) {
      return {
        status: 'fail',
        data: { message: 'User already exists with this email.' }
      }
    }
    const newUser = { email, username, library: [] }
    setUsers(prev => [...prev, newUser])
    setUser(newUser)

    return { status: 'success', data: { user } }
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, signUp, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be wrapped in an AuthProvider')
  }
  return context
}
