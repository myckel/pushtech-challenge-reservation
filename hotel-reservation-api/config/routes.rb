Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, path: '', controllers: {
        sessions: 'api/v1/sessions',
        registrations: 'api/v1/registrations'
      }
      resources :reservations, only: [:index, :show, :create, :update, :destroy], defaults: { format: :json }
    end
  end
end
