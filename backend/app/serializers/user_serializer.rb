# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :user_name, :profile_photo_url, :background_photo, :bio

  def profile_photo_url
    object.profile_photo.url if object.profile_photo.present?
  end
end
