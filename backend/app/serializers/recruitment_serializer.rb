# frozen_string_literal: true

class RecruitmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :event_date, :deadline, :status, :role, :team_id, :address, :latitude, :longitude

  belongs_to :team

  def address
    object.address
  end

  def latitude
    object.latitude
  end

  def longitude
    object.longitude
  end
end
