# frozen_string_literal: true

class RecruitmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location_id, :event_date, :deadline, :status, :role, :created_at, :updated_at, :team_id, :is_user_team

  def is_user_team
    @instance_options[:is_user_team]
  end
end
