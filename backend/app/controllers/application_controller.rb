# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_request
  include ActionController::Cookies

  private
    def authenticate_request
      token = cookies.encrypted[:auth_token]
      unless token
        render json: { errors: "No token provided" }, status: :forbidden
      end

      begin
          decoded = JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, { algorithm: "HS256" })
          @current_user = User.find(decoded[0]["id"])
          rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
            render json: { errors: "Invalid or expired token" }, status: :unauthorized
          rescue ActiveRecord::RecordNotFound
            render json: { errors: "User not found" }, stasus: :unauthorized
        end
    end

    # helper_method :current_user
    attr_reader :current_user
end
