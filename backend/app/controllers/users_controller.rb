# frozen_string_literal: true

class UsersController < ApplicationController
  # include ActionController::Cookies
  # 新規ユーザーの作成時に認証が不要
  skip_before_action :authenticate_user, only: [:create]

  # GET /users/:id
  def show
    return unauthorized_access unless authorized_user?
    render json: @current_user.as_json(except: [:password_digest]), status: :ok
  end

  def create
    @user = User.new(user_params)
    if @user.save
      token = @user.generate_jwt
    #   cookies.encrypted[:jwt] = {
    #     value: token,
    #     httponly: true,
    #     secure: true,
    #     expires: 24.hours.from_now,
    #     same_site: None # 開発ではLax、本番ではStrict
    # }
    #   puts "Setting cookie for domain: #{request.domain}"  # ドメインのログ出力
    #   puts "Cookie secure flag: #{Rails.env.production?}"  # セキュアフラグの状態ログ出力
    # Cookieに関しては本番環境で実装
      render json: { token: token, user_id: @user.id }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /users/:id
  def update
    return unauthorized_access unless authorized_user?
    if @current_user.update(user_params)
      render json: { message: "User updated successfully" }, status: :ok
    else
      render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    return unauthorized_access unless authorized_user?
    @current_user.destroy
    render json: { message: "User deleted successfully" }, status: :ok
  end

    private
      def user_params
        params.required(:user).permit(:email, :password, :user_name)
      end

      def authorized_user?
        @current_user && @current_user.id == params[:id].to_i
      end

      def unauthorized_access
        rener json: { message: "Not authorized" }, status: :unauthorized
      end
end
