import { ReservationList } from './ReservationList'

export function Dashboard() {
  return (
    <div className='dashboard'>
      <h1 style={{ textAlign: 'center' }}>Reservations</h1>
      <ReservationList />
    </div>
  )
}
