import './App.scss'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Dashboard />
      </div>
    </BrowserRouter>
  )
}

export default App
