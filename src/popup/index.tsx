import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Popup'
import './index.css'
import AuthProvider from '../useContext/AuthContext'
import PublicProvider from '../useContext/PublicContext'
import ProtectedProvider from '../useContext/ProtectedContext'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <PublicProvider>
        <ProtectedProvider>
          <App />
        </ProtectedProvider>
      </PublicProvider>
    </AuthProvider>
  </React.StrictMode>,
)
