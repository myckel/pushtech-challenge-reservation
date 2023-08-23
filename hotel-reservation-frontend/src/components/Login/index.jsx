import { useState } from 'react'
import { navigate } from 'wouter/use-location'
import api from '../../services/api'

export function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async () => {
    try {
      const payload = {
        user: {
          email: username,
          password: password
        }
      }

      const response = await api.post('/sign_in', payload)
      const token = response.data.token
      // Store the token in the localStorage
      localStorage.setItem('token', token)

      // Inform the parent component (or any other interested component)
      // about the successful login by providing them the token.
      onLogin(response.data.token)

      setError(null) // Clear any previous errors on successful login
      navigate('/dashboard') // Navigate to the dashboard
    } catch (error) {
      console.error('Login failed:', error)

      setError(error?.response?.data?.error || 'An unknown error occurred')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h1>Reservations</h1>
        <input
          className='login-input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          className='login-input'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button className='login-button' onClick={handleLogin}>
          Login
        </button>
        {error && <p className='error-message'>{error}</p>}
      </div>
    </div>
  )
}
