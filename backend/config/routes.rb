# frozen_string_literal: true

Rails.application.routes.draw do
  post   "/signup", to: "users#create"
  post   "/login",  to: "sessions#create"
  delete "/logout", to: "sessions#logout"

  # マイページ用のルート
  get "/me",     to: "users#show"
  # チーム作成のルート
  resources :teams
end
