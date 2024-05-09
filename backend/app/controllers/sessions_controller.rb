# frozen_string_literal: true

class SessionsController < ApplicationController
  include ActionController::Cookies
  skip_before_action :authenticate_request, only: [:create, :logout]

  # login_user
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = user.generate_jwt
      Rails.logger.debug "Setting cookie for domain: #{request.domain}"
      # JWTをHttpOnlyクッキーにセット
      cookies.encrypted[:auth_token] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        expires: 24.hours.from_now,
        domain: 'localhost',
        same_site: Rails.env.production? ? :strict : :lax, # 開発ではLax、本番ではStrict
        # domain: 'all' # ドメインを設定
      }
      Rails.logger.info "Setting cookie: #{cookies.inspect}"
      render json: { user: { id: user.id, email: user.email } }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def logout
    cookies.delete(:auth_token)
    render json: { message: "Successfully logged out" }, status: :ok
  end
end
