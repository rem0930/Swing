class UsersController < ApplicationController
  # 新規ユーザーの作成時に認証が不要
  skip_before_action :authenticate_request, only: [:create]

  # マイページ
  def show
    render json: @current_user, status: :ok
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { status: "User created successfully" }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

    private

    def user_params
      params.required(:user).permit(:email, :password, :user_name, :profile_photo, :background_photo, :bio)
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
