# frozen_string_literal: true

class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :profile_photo_url, :details, :background_photo_url

  def profile_photo_url
    object.profile_photo.url if object.profile_photo.present?
  end

  def background_photo_url
    object.background_photo.url if object.background_photo.present?
  end
end
