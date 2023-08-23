class ApplicationController < ActionController::API
  before_action :authenticate_request

  attr_reader :current_user

  private
  def authenticate_request
    auth_header = request.headers['HTTP_AUTHORIZATION']
    token = auth_header.split(' ').last if auth_header
    return render json: { error: 'Token not provided' }, status: :unauthorized unless token

    decoded_token = JWT.decode(token, JWT_SECRET, true, { algorithm: JWT_ALGORITHM })
    @current_user = User.find(decoded_token[0]['id'])

    render json: { error: 'Not Authenticated' }, status: :unauthorized unless @current_user
  rescue JWT::DecodeError
    render json: { error: 'Invalid token' }, status: :unauthorized
  end

  def pagination_meta(object)
    {
      current_page: object.current_page,
      next_page: object.next_page,
      prev_page: object.prev_page,
      total_pages: object.total_pages,
      total_count: object.total_count
    }
  end
end
