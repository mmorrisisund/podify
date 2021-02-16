import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { SearchProvider } from './context/SearchContext'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
