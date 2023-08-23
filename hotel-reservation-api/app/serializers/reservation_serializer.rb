class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :reservation_id, :hotel_name, :price, :currency, :start_date, :end_date, :guest_name, :guest_email

  # MongoDB ID to string
  def id
    object.id.to_s
  end
end
