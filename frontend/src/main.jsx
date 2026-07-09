// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// )



// // src/main.jsx
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App'
// import './index.css'
// import './i18n' // Import i18n configuration

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// )





// // src/main.jsx
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App'
// import './index.css'
// import './i18n' // Import i18n configuration

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// )



// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next' // ✅ Add this
import i18n from './i18n/config' // ✅ Import config directly
import App from './App'
import './index.css'

console.log('🚀 App starting...')
console.log('🔍 i18n language:', i18n.language)
console.log('🔍 i18n resources available:', Object.keys(i18n.store.data || {}))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}> {/* ✅ Add I18nextProvider */}
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
)