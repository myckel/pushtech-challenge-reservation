import { useEffect, useState } from 'react'
import { useRoute, Link } from 'wouter'
import api from '../../services/api'

export function ShowReservation() {
  const [match, params] = useRoute('/show/:id')
  const reservationId = params.id
  const [reservationData, setReservationData] = useState({})
  const [loading, setLoading] = useState(true)
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
      {error && <p className='error-message'>{error}</p>}
      <div>
        <div className='container'>
          <h2>Reservation Details</h2>
          <table className='table'>
            <tbody>
              <tr>
                <th>Reservation ID</th>
                <td>{reservationData.reservation_id}</td>
              </tr>
              <tr>
                <th>Hotel Name</th>
                <td>{reservationData.hotel_name}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>{reservationData.price.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Currency</th>
                <td>{reservationData.currency}</td>
              </tr>
              <tr>
                <th>Start Date</th>
                <td>{reservationData.start_date}</td>
              </tr>
              <tr>
                <th>End Date</th>
                <td>{reservationData.end_date}</td>
              </tr>
              <tr>
                <th>Guest Name</th>
                <td>{reservationData.guest_name}</td>
              </tr>
              <tr>
                <th>Guest Email</th>
                <td>{reservationData.guest_email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link to='/dashboard'>
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  )
}
