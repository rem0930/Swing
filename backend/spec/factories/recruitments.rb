# frozen_string_literal: true

FactoryBot.define do
  factory :recruitment do
    title { "MyString" }
    description { "MyText" }
    event_date { "2023-12-31" }
    deadline { "2023-12-31" }
    status { "open" }
    role { "member" }
    address { "Sample Address" }
    latitude { 35.6895 }
    longitude { 139.6917 }
    association :team
  end
end