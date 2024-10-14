import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
      />
      <App />
  </UserProvider>
)
