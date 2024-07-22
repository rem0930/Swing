# frozen_string_literal: true

module Api
  module V1
    class ConversationsController < ApplicationController
      before_action :set_current_user

      def index
        conversations = Conversation.joins(:recruitment, :user)
                                    .select('conversations.*, users.user_name, users.profile_photo AS profile_photo_url, recruitments.title AS recruitment_title')
                                    .where('users.id = ? OR recruitments.team_id = ?', @current_user.id, @current_user.team.id)

        render json: conversations, status: :ok
      end

      private

      def set_current_user
        @current_user = User.find_by(id: params[:user_id])
      end
    end
  end
end
