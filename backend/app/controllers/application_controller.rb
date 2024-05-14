# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_request

  private
    def authenticate_request
      # token = cookies.encrypted[:jwt]
      unless token
        render json: { errors: "No token provided" }, status: :forbidden
        return
      end

      begin
        decoded = JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, { algorithm: "HS256" })
        @current_user = User.find(decoded[0]["user_id"])
      rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
        render json: { errors: "Invalid or expired token" }, status: :unauthorized
      rescue ActiveRecord::RecordNotFound
        render json: { errors: "User not found" }, status: :unauthorized
        nil
      end
    end

    def current_user
      @current_user
    end
end
