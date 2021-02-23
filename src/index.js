import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import { SearchProvider } from './context/SearchContext'
import { PlayProvider } from './context/PlayContext'
import { AuthProvider } from './providers/auth'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SearchProvider>
          <PlayProvider>
            <App />
          </PlayProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
