# frozen_string_literal: true

module Api
  module V1
    class PasswordsController < ApplicationController
      skip_before_action :authenticate_user, only: [:reset]

      def update
        if current_user.update(password_params)
          render json: { message: "Password updated successfully" }, status: :ok
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def reset
        user = User.find_by(email: params[:email])
        if user
          reset_token = SecureRandom.hex(10)
          user.update(reset_password_token: reset_token, reset_password_sent_at: Time.current)
          # ここでパスワードリセットのメールを送信する
          render json: { message: "Password reset instructions sent to your email" }, status: :ok
        else
          render json: { errors: ["Email not found"] }, status: :not_found
        end
      end

        private
          def password_params
            params.require(:user).permit(:password, :password_confirmation)
          end
    end
  end
end
