import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import UserContextProvider from './store/UserContextProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <StrictMode>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <App />
    </StrictMode>
  </UserContextProvider>
)
