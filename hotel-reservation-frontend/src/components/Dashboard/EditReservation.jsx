import { useEffect, useState } from 'react'
import { useRoute, Link } from 'wouter'
import { ReservationForm } from './ReservationForm'
import api from '../../services/api'

export function EditReservation() {
  const [match, params] = useRoute('/edit/:id')
  const reservationId = params.id
  const [reservationData, setReservationData] = useState({})
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .get(`/reservations/${reservationId}`)
      .then((response) => {
        setReservationData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching reservation:', error)
        setLoading(false)
      })
  }, [reservationId])

  if (loading) {
    return <div>Loading reservation data...</div>
  }

  return (
    <div className='container'>
      <h2 style={{ textAlign: 'center' }}>Edit Reservation</h2>
      {success ? (
        <div>
          <p>Reservation updated successfully!</p>
          <Link to='/dashboard'>
            <button>Back to Dashboard</button>
          </Link>
        </div>
      ) : (
        <>
          {error && <p className='error-message'>{error}</p>}
          <ReservationForm
            mode='edit'
            initialData={reservationData}
            setSuccess={setSuccess}
            setError={setError}
          />
        </>
      )}
    </div>
  )
}
