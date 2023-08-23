class Reservation
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields
  field :reservation_id, type: String
  field :hotel_name, type: String
  field :price, type: Float
  field :currency, type: String
  field :start_date, type: Date
  field :end_date, type: Date
  field :guest_name, type: String
  field :guest_email, type: String
  field :created_by_id, type: BSON::ObjectId

  # Indexes
  index({ reservation_id: 1, user_id: 1 }, { unique: true })

  # Relationships
  belongs_to :user
  belongs_to :created_by_user, class_name: 'User', foreign_key: 'created_by_id'

  # Validations
  validates :price, numericality: { greater_than: 0 }
  validates :reservation_id, format: { with: /\A[a-zA-Z0-9]+\z/, message: "Only allows letters and numbers" }
  validates :reservation_id, uniqueness: { scope: :user_id, message: "You already have a reservation with this ID." }
  validate :reservation_id_unchanged, on: :update
  validate :check_out_date_after_check_in_date

  # Callbacks
  before_validation :find_or_create_user_by_guest_email

  private
  def reservation_id_unchanged
    if reservation_id_changed?
      errors.add(:reservation_id, "cannot be changed.")
    end
  end

  def check_out_date_after_check_in_date
    return unless start_date && end_date

    if end_date <= start_date
      errors.add(:end_date, "must be after check-in date")
    end
  end

  # Find or create a new guest user by email
  def find_or_create_user_by_guest_email
    self.user = User.find_or_create_by(email: guest_email) do |user|
      password = Devise.friendly_token[0, 20]
      user.password = password
      user.save(validate: false)
    end
  end
end
