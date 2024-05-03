Rails.application.routes.draw do
  post "/signup", to: "users#create"
  post "/login",  to: "sessions#create"

  # マイページ用のルート
  get "/me",     to: "users#show"
  # チーム作成のルート
  resources :teams
  get "up" => "rails/health#show", as: :rails_health_check
end
