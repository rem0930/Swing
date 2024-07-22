# frozen_string_literal: true

module Api
  module V1
    class RegistrationsController < ApplicationController
      skip_before_action :authenticate_user, only: [:create]

      def create
        user = User.new(user_params)
        if user.save
          puts "User saved successfully: #{user.id}"
          token = user.generate_token
          render json: { user: user, token: token }, status: :created
        else
          puts "User save failed: #{user.errors.full_messages}"
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

        private
          def user_params
            params.require(:user).permit(:user_name, :email, :password)
          end
    end
  end
end
