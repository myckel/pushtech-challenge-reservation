module Api
  module V1
    class SessionsController < Devise::SessionsController
      skip_before_action :authenticate_request, only: [:create]

      # Override create to provide token-based authentication
      def create
        user = User.find_for_database_authentication(email: params[:user][:email])
        if user && user.valid_password?(params[:user][:password])
          token = user.generate_jwt
          render json: { token: token, email: user.email }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
    end
  end
end
