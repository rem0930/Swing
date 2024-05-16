# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper
  post   "/signup", to: "registations#create"
  post   "/login",  to: "sessions#create"
  delete "/logout", to: "sessions#logout"

  resources :users, only: [:show, :update, :destroy]
  resources :registrations, only: [:create]
  resources :sessions, only: [:create, :destroy]
  resource :passwords, only: [:update] do
    post :reset, on: :collection
  end
  resources :emails, only: [:update]
  resources :teams do
    resources :recruitments, only:[:create, :index]
  end
  resources :recruitments
  resources :teams, only: [:show]
end
