# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user
  include ErrorHandler

  private
    # ユーザーの認証を行う
    def authenticate_user
      token = token_from_request_headers
      unless token
        render json: { error: "Authorization token is missing" }, status: :unauthorized
        return
      end

      user_id = decode_token(token)
      find_current_user(user_id)
    rescue ActiveRecord::RecordNotFound
      render_user_not_found
    rescue JWT::DecodeError => e
      log_error(e)
      render_invalid_token("Invalid token")
    rescue JWT::ExpiredSignature => e
      log_error(e)
      render_invalid_token("Expired token")
    rescue JWT::VerificationError => e
      log_error(e)
      render_invalid_token("Token verification failed")
    end

    # JWTトークン生成メソッド
    def generate_token
      JWT.encode({ user_id: self.id, exp: 24.hours.from_now.to_i }, Rails.application.credentials.jwt_secret_key, "HS256")
    end

    # リクエストヘッダーからトークンを取得する
    def token_from_request_headers
      request.headers["Authorization"]&.split&.last
    end

    # トークンをデコードしてユーザーIDを取得する
    def decode_token(token)
      decoded_token = JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, algorithm: "HS256")
      decoded_token.first["user_id"]
    end

    # ユーザーを検索する
    def find_current_user(user_id)
      @current_user = User.find(user_id)
    end

    # 無効なトークンエラーをレンダリングする
    def render_invalid_token(message = "Invalid or expired token")
      render json: { error: message }, status: :unauthorized
    end

    # リソースが見つからないエラーをレンダリングする
    def render_not_found(resource)
      render json: { error: "#{resource} not found" }, status: :not_found
    end

    # 権限がないエラーをレンダリングする
    def render_unauthorized(message = "この操作を行う権限がありません。")
      render json: { error: message }, status: :forbidden
    end

    # エラーをログに記録する
    def log_error(error)
      Rails.logger.error("#{error.class}: #{error.message}")
    end

    attr_reader :current_user
end
