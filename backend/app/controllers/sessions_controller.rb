# frozen_string_literal: true

class SessionsController < ApplicationController
  include ActionController::Cookies
  skip_before_action :authenticate_request, only: [:create, :logout]

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = user.generate_jwt
      puts "Setting cookie for domain: #{request.domain}"  # ドメインのログ出力
      puts "Cookie secure flag: #{Rails.env.production?}"  # セキュアフラグの状態ログ出力
      cookies.encrypted[:auth_token] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,# 本番環境ではtrueになる
        path: '/',
        expires: 24.hours.from_now
      }
      render json: { token:, user: { id: user.id, email: user.email } }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def logout
    cookies.delete(:auth_token)
    render json: { message: "Successfully logged out" }, status: :ok
  end
end
