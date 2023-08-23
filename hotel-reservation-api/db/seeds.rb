Reservation.delete_all
User.delete_all

user1 = User.create!(
  first_name: 'Push',
  last_name: 'Tech',
  email: 'pushtech@challenge.com',
  password: 'pushtech',
  password_confirmation: 'pushtech'
)

user2 = User.create!(
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@example.com',
  password: 'johndoe',
  password_confirmation: 'johndoe'
)

# Create reservations for the first user
3.times do |i|
  user1.reservations.create!(
    reservation_id: "RESV0#{i+1}",
    hotel_name: 'TechHotel',
    price: rand(1000.0..2000.0),
    currency: 'USD',
    start_date: Date.today + i.months,
    end_date: Date.today + (i+1).months,
    guest_name: "#{user1.first_name} #{user1.last_name}",
    guest_email: user1.email,
    created_by_user: user1
  )
end

# Create reservations for the second user
3.times do |i|
  user2.reservations.create!(
    reservation_id: "RESV0#{i+4}",
    hotel_name: 'TechHotel',
    price: rand(1000.0..2000.0),
    currency: 'USD',
    start_date: Date.today + i.months,
    end_date: Date.today + (i+1).months,
    guest_name: "#{user2.first_name} #{user2.last_name}",
    guest_email: user2.email,
    created_by_user: user1
  )
end
