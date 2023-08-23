require 'rails_helper'

RSpec.describe Reservation, type: :model do
  describe 'validations' do
    let(:user) { create(:user) }
    subject { build(:reservation, user: user, created_by_id: user.id) }

    it { should validate_numericality_of(:price).is_greater_than(0) }
    it { should_not allow_value('!@#$', 'abc 123').for(:reservation_id) }

    it 'validates that end_date is after start_date' do
      subject.start_date = Date.today
      subject.end_date = Date.yesterday
      expect(subject).not_to be_valid
      expect(subject.errors[:end_date]).to include("must be after check-in date")
    end
  end

  describe 'callbacks' do
    it 'finds or creates user by guest_email' do
      reservation = build(:reservation, guest_email: 'test@example.com')
      expect(reservation).to receive(:find_or_create_user_by_guest_email)
      reservation.save
    end
  end
end
