class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render json: { status: 'User created successfully' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end

  # マイページ
  def show
    render json: @current_user, status: :ok
  end

    private

    def user_params
      params.permit(:email, :password, :user_name, :profile_photo, :background_photo, :bio)
    end
end
