# frozen_string_literal: true

module Api
  module V1
    class MessagesController < ApplicationController
      before_action :authenticate_user
      before_action :set_conversation

      def index
        @messages = @conversation.messages.order(created_at: :asc)
        render json: @messages, each_serializer: MessageSerializer
      end

      def create
        message = @conversation.messages.build(message_params)
        message.sender = current_user
        message.recipient_id = params[:message][:recipient_id]

        if message.save
          render json: message, serializer: MessageSerializer, status: :created
        else
          render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private
        def set_conversation
          @conversation = Conversation.find(params[:conversation_id])
        end

        def message_params
          params.require(:message).permit(:content, :recipient_id)
        end
    end
  end
end
