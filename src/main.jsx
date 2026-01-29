import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { ChatProvider } from './context/ChatContext'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ChatProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChatProvider>
  </ThemeProvider>

)
