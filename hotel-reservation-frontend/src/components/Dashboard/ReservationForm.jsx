import { useState, useEffect, useCallback } from 'react'
import api from '../../services/api'

export function ReservationForm({
  setSuccess,
  setError,
  initialData = {},
  mode
}) {
  const [reservationData, setReservationData] = useState({
    reservation_id: '',
    hotel_name: '',
    price: 0,
    currency: 'USD',
    start_date: '',
    end_date: '',
    guest_name: '',
    guest_email: ''
  })

  useEffect(() => {
    if (mode === 'show' || mode === 'edit') {
      setReservationData(initialData)
    }
  }, [mode, initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setReservationData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      try {
        const formattedData = {
          reservation: {
            reservation_id: reservationData.reservation_id,
            hotel_name: reservationData.hotel_name,
            price: parseFloat(reservationData.price),
            currency: reservationData.currency,
            start_date: reservationData.start_date,
            end_date: reservationData.end_date,
            guest_name: reservationData.guest_name,
            guest_email: reservationData.guest_email
          }
        }

        if (mode === 'create') {
          await api.post('/reservations', formattedData)
        } else if (mode === 'edit') {
          await api.put(`/reservations/${initialData.id}`, formattedData)
        }
        setSuccess(true)
      } catch (error) {
        setError(error?.response?.data?.error || 'An error occurred')
      }
    },
    [mode, initialData, reservationData, setSuccess, setError]
  )
  return (
    <form onSubmit={handleSubmit} className='reservation-form'>
      <label>Reservation ID</label>
      <input
        className='input-field'
        name='reservation_id'
        value={reservationData.reservation_id}
        onChange={handleChange}
        placeholder='Reservation ID'
        readOnly={mode !== 'create'}
        required
      />
      <label>Hotel Name</label>
      <input
        className='input-field'
        name='hotel_name'
        value={reservationData.hotel_name}
        onChange={handleChange}
        placeholder='Hotel Name'
        required
      />
      <label>Price</label>
      <input
        className='input-field'
        name='price'
        type='number'
        value={reservationData.price}
        onChange={handleChange}
        placeholder='Price'
        required
      />
      <label>Currency</label>
      <select
        className='input-field'
        name='currency'
        value={reservationData.currency}
        onChange={handleChange}
      >
        <option value='USD'>USD</option>
        <option value='EURO'>EURO</option>
      </select>
      <label>Start Date</label>
      <input
        className='input-field'
        name='start_date'
        type='date'
        value={reservationData.start_date}
        onChange={handleChange}
        required
      />
      <label>End Date</label>
      <input
        className='input-field'
        name='end_date'
        type='date'
        value={reservationData.end_date}
        onChange={handleChange}
        required
      />
      <label>Guest Name</label>
      <input
        className='input-field'
        name='guest_name'
        value={reservationData.guest_name}
        onChange={handleChange}
        placeholder='Guest Name'
        required
      />
      <label>Guest Email</label>
      <input
        className='input-field'
        name='guest_email'
        type='email'
        value={reservationData.guest_email}
        onChange={handleChange}
        placeholder='Guest Email'
        required
      />
      <button
        className='submit-button'
        type='submit'
        disabled={mode === 'show'}
      >
        {mode === 'edit' ? 'Update' : 'Submit'}
      </button>
    </form>
  )
}
