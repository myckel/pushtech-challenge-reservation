import { useState, useEffect, useMemo } from 'react'
import { DeleteModal } from './DeleteModal'
import api from '../../services/api'
import { Link } from 'wouter'

export function ReservationList() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [reservationToDelete, setReservationToDelete] = useState(null)

  useEffect(() => {
    api
      .get('/reservations')
      .then((response) => {
        setReservations(response.data.reservations)
        setLoading(false)
      })
      .catch((error) => {
        console.error('There was an error fetching reservations:', error)
        setLoading(false)
      })
  }, [])

  const memoizedReservations = useMemo(() => reservations, [reservations])

  const handleDelete = async (reservationId) => {
    try {
      await api.delete(`/reservations/${reservationId}`)
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.id !== reservationId
        )
      )
      setShowDeleteModal(false)
      setReservationToDelete(null)
    } catch (error) {
      console.error('Error deleting reservation:', error)
    }
  }

  if (loading) {
    return <div>Loading reservations...</div>
  }

  return (
    <div className='container'>
      <Link to='/create'>
        <button style={{ float: 'right' }}>Create New Reservation</button>
      </Link>
      <table className='table table-responsive align-middle'>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Hotel Name</th>
            <th>Currency</th>
            <th>Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memoizedReservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.reservation_id}</td>
              <td>{reservation.hotel_name}</td>
              <td>{reservation.currency}</td>
              <td>{reservation.price.toFixed(2)}</td>
              <td>{reservation.start_date}</td>
              <td>{reservation.end_date}</td>
              <td>{reservation.guest_name}</td>
              <td>{reservation.guest_email}</td>
              <td colSpan={3}>
                <Link to={`/show/${reservation.id}`}>
                  <button>Show</button>
                </Link>
                <Link to={`/edit/${reservation.id}`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => {
                    setReservationToDelete(reservation.id)
                    setShowDeleteModal(true)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(reservationToDelete)}
      />
    </div>
  )
}
