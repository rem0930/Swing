# frozen_string_literal: true

module Api
  module V1
    class ConversationsController < ApplicationController
      before_action :authenticate_user

      def index
        # ユーザーが参加している会話のみを取得
        conversations = current_user.conversations.includes(:users, recruitment: { team: :user }).distinct

        render json: conversations, each_serializer: ConversationSerializer, status: :ok
      end

      def show
        conversation = current_user.conversations.includes(:users).find(params[:id])
        render json: conversation, serializer: ConversationSerializer, status: :ok
      end

      def by_user
        @user = User.find(params[:user_id])
        @conversations = @user.conversations
        if @conversations.present?
          render json: @conversations
        else
          render json: { message: 'No conversations found' }, status: :ok
        end
      end
    end
  end
end
