# frozen_string_literal: true

class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "conversation_#{message.conversation_id}_channel", message: render_message(message)
  end

  private
    def render_message(message)
      ApplicationController.render(
        partial: "messages/message",
        locals: { message: message }
      )
    end
end
