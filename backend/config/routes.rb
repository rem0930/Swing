Rails.application.routes.draw do
  post 'signup', to: 'users#create'
  get "up" => "rails/health#show", as: :rails_health_check

end
