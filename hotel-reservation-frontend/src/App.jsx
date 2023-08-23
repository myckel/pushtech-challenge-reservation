import './App.css'
import { useState } from 'react'
import { Router, Route, Redirect } from 'wouter'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { EditReservation } from './components/Dashboard/EditReservation'
import { CreateReservation } from './components/Dashboard/CreateReservation'
import { ShowReservation } from './components/Dashboard/ShowReservation'
import { logout } from './services/auth'
import { navigate } from 'wouter/use-location'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogout = () => {
    setToken(null)
    logout()
    navigate('/login')
  }

  return (
    <Router>
      <div>
        <nav>
          {token && (
            <button onClick={handleLogout} style={{ float: 'right' }}>
              Logout
            </button>
          )}
        </nav>
        <Route path='/login'>
          {token ? <Redirect to='/dashboard' /> : <Login onLogin={setToken} />}
        </Route>
        <Route path='/dashboard'>
          {token ? <Dashboard /> : <Redirect to='/login' />}
        </Route>
        <Route path='/edit/:reservationId'>
          {token ? <EditReservation /> : <Redirect to='/login' />}
        </Route>
        <Route path='/create'>
          {token ? <CreateReservation /> : <Redirect to='/login' />}
        </Route>
        <Route path='/show/:reservationId'>
          {token ? <ShowReservation /> : <Redirect to='/login' />}
        </Route>
        <Route path='/:rest*'>
          <Redirect to='/login' />
        </Route>
      </div>
    </Router>
  )
}

export default App
