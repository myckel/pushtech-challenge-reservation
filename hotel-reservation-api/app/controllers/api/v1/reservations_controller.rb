module Api
  module V1
    class ReservationsController < ApplicationController
      before_action :set_reservation, only: [:show, :update, :destroy]

      # GET /reservations
      def index
        @reservations = Reservation.all

        page = params[:page] || 1
        per_page = params[:per_page] || 10
        @reservations = @reservations.page(page).per(per_page)

        render json: { reservations: ActiveModel::SerializableResource.new(@reservations, each_serializer: ReservationSerializer),
          meta: pagination_meta(@reservations)
        }
      end

      # GET /reservations/:id
      def show
        render json: @reservation, status: :ok
      end

      # POST /reservations
      def create
        @reservation = Reservation.new(reservation_params)
        @reservation.created_by_user = current_user

        if @reservation.save
          render json: @reservation, status: :created
        else
          render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /reservations/:id
      def update
        if @reservation.update(reservation_params)
          render json: @reservation, status: :ok
        else
          render json: { errors: @reservation.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /reservations/:id
      def destroy
        @reservation.destroy
        render json: { message: 'Reservation was successfully destroyed.' }, status: :no_content
      end

      private

      def set_reservation
        @reservation = Reservation.find(params[:id])
      rescue Mongoid::Errors::DocumentNotFound
        render json: { error: 'Reservation not found' }, status: :not_found
      end

      def reservation_params
        params.require(:reservation).permit(:reservation_id, :hotel_name, :price, :currency, :start_date, :end_date, :guest_name, :guest_email)
      end
    end
  end
end
