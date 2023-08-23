require 'rails_helper'

module Api
  module V1
    RSpec.describe ReservationsController, type: :controller do
      let(:user) { FactoryBot.create(:user, password: 'password123', password_confirmation: 'password123') }
      let(:valid_attributes) { attributes_for(:reservation, created_by_id: user.id) }
      let(:invalid_attributes) { attributes_for(:reservation, end_date: valid_attributes[:start_date]) }

      before do
        token = user.generate_jwt
        request.headers['Authorization'] = "Bearer #{token}"
      end

      describe 'GET #index' do
        it 'returns a success response' do
          get :index
          expect(response).to have_http_status(:ok)
        end
      end

      describe 'GET #show' do
        it 'returns a success response' do
          reservation = create(:reservation, created_by_id: user.id)
          get :show, params: { id: reservation.to_param }
          expect(response).to have_http_status(:ok)
        end
      end

      describe 'POST #create' do
        context 'with valid params' do
          it 'creates a new Reservation' do
            expect {
              post :create, params: { reservation: valid_attributes }
            }.to change(Reservation, :count).by(1)
            expect(response).to have_http_status(:created)
          end
        end

        context 'with invalid params' do
          it 'renders a JSON response with errors for the new reservation' do
            post :create, params: { reservation: invalid_attributes }
            expect(response).to have_http_status(:unprocessable_entity)
            expect(JSON.parse(response.body)).to have_key('errors')
          end
        end
      end

      describe 'PUT #update' do
        context 'with valid params' do
          it 'updates the requested reservation' do
            reservation = create(:reservation, created_by_id: user.id)
            new_attributes = { hotel_name: 'New Hotel' }
            put :update, params: { id: reservation.to_param, reservation: new_attributes }
            reservation.reload
            expect(reservation.hotel_name).to eq('New Hotel')
            expect(response).to have_http_status(:ok)
          end
        end

        context 'with invalid params' do
          it 'renders a JSON response with errors for the reservation' do
            reservation = create(:reservation, created_by_id: user.id)
            put :update, params: { id: reservation.to_param, reservation: invalid_attributes }
            expect(response).to have_http_status(:unprocessable_entity)
            expect(JSON.parse(response.body)).to have_key('errors')
          end
        end
      end

      describe 'DELETE #destroy' do
        it 'destroys the requested reservation' do
          reservation = create(:reservation, created_by_id: user.id)
          expect {
            delete :destroy, params: { id: reservation.to_param }
          }.to change(Reservation, :count).by(-1)
          expect(response).to have_http_status(:no_content)
        end
      end
    end
  end
end
