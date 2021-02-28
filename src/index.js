import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import './index.css'
import App from './App'
import { SearchProvider } from './context/SearchContext'
import { PlayProvider } from './context/PlayContext'
import { AuthProvider } from './providers/auth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SearchProvider>
            <PlayProvider>
              <App />
            </PlayProvider>
          </SearchProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
