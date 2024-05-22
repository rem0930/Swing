# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authorized_user, only: [:update, :destroy]
  before_action :authenticate_user, only: [:profile, :current, :has_team]

  # GET /users/:id
  def show
    render json: @user, status: :ok
  end

  # GET /profile
  def profile
    if @current_user
      render json: @current_user, status: :ok
    else
      render json: { error: "Not Authorized" }, status: :unauthorized
    end
  end

  # GET /current_user
  def current
    render_current_user
  end

    # GET /has_team
    def has_team
      if current_user.team
        render json: { has_team: true, team_id: current_user.team.id }
      else
        render json: { has_team: false }
      end
    end

  # PUT /users/:id
  def update
    if @user.update(user_params)
      render json: { message: "User updated successfully" }, status: :ok
    else
      Rails.logger.debug(@user.errors.full_messages) # エラーメッセージをログに出力
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    render json: { message: "User deleted successfully" }, status: :ok
  end

  private
    def set_user
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render_user_not_found
    end

    def user_params
      params.require(:user).permit(:user_name, :profile_photo, :bio)
    end

    def authorized_user
      unless @user == @current_user
        render json: { error: "Not authorized to access this resource" }, status: :unauthorized
      end
    end

    def render_user_not_found
      render json: { error: "User not found" }, status: :not_found
    end
end
