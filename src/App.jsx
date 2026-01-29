import { Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Settings from './pages/Settings'
import AppLayout from './layout/AppLayout'

const App = () => {
  return (
    <Routes>     
      <Route element={<AppLayout />}>
      <Route path="/" element={<Chat />} />
      <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
