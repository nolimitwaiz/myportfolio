import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// The site is one page. Send old sub-page URLs back to the home page.
if (window.location.pathname !== '/myportfolio/') {
  window.history.replaceState(null, '', '/myportfolio/')
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
