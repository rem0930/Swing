# frozen_string_literal: true

module Api
  module V1
    class EmailsController < ApplicationController
      before_action :set_user

      def update
        if @user.update(email_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

        private
          def set_user
            @user = User.find(params[:id])
          end

          def email_params
            params.require(:user).permit(:email)
          end
    end
  end
end
