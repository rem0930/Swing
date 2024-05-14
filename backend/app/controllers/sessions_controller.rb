# frozen_string_literal: true

class SessionsController < ApplicationController
  # include ActionController::Cookies
  skip_before_action :authenticate_user, only: [:create, :logout]

  # login_user
  def create
    user = User.find_by(email: params[:email])
    if user
      if user&.authenticate(params[:password])
        token = user.generate_jwt
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
