# frozen_string_literal: true

class SessionsController < ApplicationController
  include ActionController::Cookies
  skip_before_action :authenticate_request, only: [:create]

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = user.generate_jwt
      cookies.encrypted[:auth_token] = { value: token, httponly: true, expires: 24.hours.from_now }
      render json: { token:, user: { id: user.id, email: user.email } }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end
end
