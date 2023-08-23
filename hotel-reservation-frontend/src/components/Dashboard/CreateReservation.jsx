import { useState } from 'react'
import { ReservationForm } from './ReservationForm'
import { Link } from 'wouter'

export function CreateReservation() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div className='container'>
      <h2 style={{ textAlign: 'center' }}>Create Reservation</h2>
      {success ? (
        <div>
          <p>Reservation created successfully!</p>
          <Link to='/dashboard'>
            <button>Back to Dashboard</button>
          </Link>
        </div>
      ) : (
        <>
          {error && <p className='error-message'>{error}</p>}
          <ReservationForm
            mode='create'
            setSuccess={setSuccess}
            setError={setError}
          />
        </>
      )}
    </div>
  )
}
