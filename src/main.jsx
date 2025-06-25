import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MedicationCalendar from './assets/Calender.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <MedicationCalendar/> */}
  </StrictMode>,
)
