import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { setupApiClient } from '@/app/configureApi'
import './index.css'

setupApiClient()

const container = document.getElementById('root')
if (!container) throw new Error('No se encontró el elemento #root')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
