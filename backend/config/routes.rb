# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper
  scope "/api" do
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

    resources :users, only: [:show, :update, :destroy]
    resources :registrations, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resource :passwords, only: [:update] do
      post :reset, on: :collection
    end
    resources :users, only: [:show, :update, :destroy]
    resource :passwords, only: [:update] do
      post :reset, on: :collection
    end
    resources :emails, only: [:update]

    resources :teams, only: [:show, :index, :create, :update, :destroy] do
      resources :recruitments, only: [:create, :index]
    end

    resources :recruitments, only: [:index, :show, :create, :update, :destroy] do
      member do
        patch :close
      end
      collection do
        get "/by_team/:team_id", to: "recruitments#by_team"
      end
    end

    resources :applications, only: [:index, :create]

    # 応募チェックのためのエンドポイント
    get "applications/check", to: "applications#check"

    resources :favorites, only: [:create, :index, :destroy]
  end
end
