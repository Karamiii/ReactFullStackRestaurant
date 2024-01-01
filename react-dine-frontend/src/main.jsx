import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  // Had to remove Strict mode since it rendered twice when updating cart state
  // Removed 2 items with one click...

  //<React.StrictMode>
    <App />
  //</React.StrictMode>,
)
