# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user

  private

    # ユーザーの認証を行う
    def authenticate_user
      token = token_from_request_headers
      return unless token

      # トークンからユーザーIDを取得する
      user_id = decode_token(token)
      @current_user = User.find(user_id)
    rescue ActiveRecord::RecordNotFound
      render_user_not_found
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
      render_invalid_token
    end

    # リクエストヘッダーからトークンを取得する
    def token_from_request_headers
      request.headers['Authorization']&.split&.last
    end

    # トークンをデコードしてユーザーIDを取得する
    def decode_token(token)
      decoded_token = JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, algorithm: 'HS256')
      decoded_token.first['user_id']
    end

    # 無効なトークンエラーをレンダリングする
    def render_invalid_token
      render json: { error: 'Invalid or expired token' }, status: :unauthorized
    end

    # ユーザーが見つからない場合のエラーをレンダリングする
    def render_user_not_found
      render json: { error: 'User not found' }, status: :not_found
    end

    def current_user
      @current_user
    end
end
