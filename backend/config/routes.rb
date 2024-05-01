Rails.application.routes.draw do
  post 'signup', to: 'users#create'
  post 'login', to: 'sessions#create'
  get "up" => "rails/health#show", as: :rails_health_check

end
