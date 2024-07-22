# frozen_string_literal: true

class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :participant

  def participant
    user = object.recruitment.user == scope ? object.applications.first.user : object.recruitment.user
    { id: user.id, userName: user.user_name, profilePhoto: user.profile_photo }
  end
end
