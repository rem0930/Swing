# frozen_string_literal: true

class UsersController < ApplicationController
  include ActionController::Cookies
  # 新規ユーザーの作成時に認証が不要
  skip_before_action :authenticate_request, only: [:create]

  # マイページ
  def show
    if @current_user
      render json: @current_user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      token = @user.generate_jwt
      cookies.encrypted[:auth_token] = {
      value: token,
      httponly: true,
      path: '/',
      # secure: Rails.env.production?,  # 本番環境でのみsecureオプションを有効にする
      expires: 24.hours.from_now
    }
      puts "Setting cookie for domain: #{request.domain}"  # ドメインのログ出力
      puts "Cookie secure flag: #{Rails.env.production?}"  # セキュアフラグの状態ログ出力
      render json: { token: token }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

    private
      def user_params
        params.required(:user).permit(:email, :password, :user_name)
      end

      def user_errors
        errors = []
        errors << "Email has already been taken" if @user.errors[:email].present?
        errors << "Password is too short (minimum is 6 characters)" if @user.errors[:password].present?
        errors << "User name is required" if @user.errors[:user_name].present?
        # 他のエラーチェックも追加可能
        errors
      end
end
