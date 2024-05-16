class RecruitmentSerializer < ActiveModel::Serializer
    attributes :id, :title, :description, :location_id, :event_date, :deadline, :status, :role, :team_id, :created_at, :updated_at
end
