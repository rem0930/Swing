# frozen_string_literal: true

class SessionsController < ApplicationController
  # include ActionController::Cookies
  skip_before_action :authenticate_request, only: [:create, :logout]

  # login_user
  def create
    user = User.find_by(email: params[:email])
    if user
      if user&.authenticate(params[:password])
        token = user.generate_jwt
        # cookies.encrypted[:jwt] = {
        #   value: token,   # JWT token
        #   httponly: true, # JavaScriptからのアクセスを防ぐ
        #   secure: true,
        #   same_site: :None # CSRF攻撃防止
        # }
        # Rails.logger.info "Setting cookie: #{cookies.inspect}"
        render json: { token: token, user_id: user.id, success: "Logged in successfully" }, status: :ok
      else
        render json: { error: "Invalid password" }, status: :unauthorized
      end
    else
      render json: { error: "Email not found" }, status: :unauthorized
    end
  end

  def logout
    render json: { message: "Successfully logged out" }, status: :ok
  end
end
