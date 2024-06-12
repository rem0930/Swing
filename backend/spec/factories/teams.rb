# frozen_string_literal: true

# spec/factories/teams.rb
FactoryBot.define do
  factory :team do
    name { "Team Name" }
    details { "Team details" }
    association :user
    profile_photo { nil }
    background_photo { nil }
  end
end
