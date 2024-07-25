# frozen_string_literal: true

# app/serializers/conversation_serializer.rb

class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :recruitment_title, :participants

  def recruitment_title
    object.recruitment.title
  end

  def participants
    object.users.map do |user|
      {
        id: user.id,
        user_name: user.user_name,
        profile_photo_url: user.profile_photo
      }
    end
  end
end
