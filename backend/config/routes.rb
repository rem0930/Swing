# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper
  post   "/signup", to: "users#create"
  post   "/login",  to: "sessions#create"
  delete "/logout", to: "sessions#logout"

  resources :users
  resources :teams
  resources :recruitments
end
