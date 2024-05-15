# frozen_string_literal: true

class SessionsController < ApplicationController
  # include ActionController::Cookies
  skip_before_action :authenticate_user, only: [:create, :logout]

  # login_user
  def create
    user = User.find_by(email: params[:email])

    if user
      if user&.authenticate(params[:password])
        token = user.generate_token
        render json: { token: token, user: user }, status: :ok
      else
        render json: { error: "Invalid password" }, status: :unauthorized
      end
    else
      render json: { error: "Email not found" }, status: :unauthorized
    end
  end

  def logout
    # ログアウト処理（クライアント側でトークンを削除する）
    render json: { message: "Successfully logged out" }, status: :ok
  end
end
