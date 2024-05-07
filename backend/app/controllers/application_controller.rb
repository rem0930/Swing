# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_request

  private
    def authenticate_request
      header = request.headers["Authorization"]
      header = header.split(" ").last if header

      if header
        decoded_authentication_token(header)
      else
        render json: { errors: "No token provided" }, status: :forbidden
      end
    end

    def decoded_authentication_token(token)
      @decoded = JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, { algorithm: "HS256" })[0]
      @current_user = User.find(@decoded["id"])
    rescue JWT::DecodeError => e
      render json: { errors: "Invalid token: #{e.message}" }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound
      render json: { errors: "User not found" }, status: :unauthorized
    rescue JWT::ExpiredSignature
      render json: { errors: "Token has expired" }, status: :unauthorized
    rescue JWT::VerificationError
      render json: { errors: "Token verification failed" }, status: :unauthorized
    end

    def handle_token_error(message)
      Rails.logger.warn("Authentication failed: #{message}")
      render json: { errors: message }, status: :unauthorized
    end

    attr_reader :current_user
end
