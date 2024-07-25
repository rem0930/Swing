# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper
  namespace :api do
    namespace :v1 do
      # ユーザー認証関連のルート
      post   "/signup", to: "registrations#create"
      post   "/login",  to: "sessions#create"
      delete "/logout", to: "sessions#destroy"

      # 現在のユーザー情報取得
      get    "/current_user", to: "users#current"
      # 自分のプロフィールページ用
      get    "/profile", to: "users#profile"
      # 自分のチーム情報を取得
      get    "/has_team", to: "users#has_team"

      resources :users, only: [:show, :update, :destroy] do
        collection do
          patch "update_profile_photo"
          delete "delete_profile_photo"
        end
      end

      resources :registrations, only: [:create]
      resources :sessions, only: [:create, :destroy]
      resource :passwords, only: [:update] do
        post :reset, on: :collection
      end
      resources :emails, only: [:update]

      resources :teams, only: [:show, :index, :create, :update, :destroy] do
        member do
          get "owner_check"
          patch "update_profile_photo"
          delete "delete_profile_photo"
        end
        resources :recruitments, only: [:index, :create]
      end

      resources :recruitments, only: [:index, :show, :create, :update, :destroy] do
        member do
          patch :close
          get "applications/check", to: "applications#check"  # ネストされたチェックエンドポイント
        end
        collection do
          get "/by_team/:team_id", to: "recruitments#by_team"
        end

        # ネストされたapplicationsのルート
        resources :applications, only: [:create]
      end

      # 単独のapplicationsのルート
      resources :applications, only: [:index]

      resources :favorites, only: [:create, :index, :destroy]

      resources :conversations, only: [:index, :show] do
        resources :messages, only: [:index, :create]
      end
    end
  end
end
