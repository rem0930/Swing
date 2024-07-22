# app/channels/chatroom_channel.rb

class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    # クライアントがチャットルームにサブスクライブするときの処理
    stream_for conversation
  end

  def unsubscribed
    # クライアントがチャットルームからサブスクライブを解除するときの処理
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # クライアントからメッセージが送信されたときの処理
    message = conversation.messages.new(content: data['message'], sender_id: current_user.id)
    if message.save
      ChatroomChannel.broadcast_to(conversation, message)
    end
  end

  private

  def conversation
    @conversation ||= Conversation.find(params[:conversation_id])
  end
end
