import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pomodoro from './Pomodoro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pomodoro />
  </StrictMode>,
)
