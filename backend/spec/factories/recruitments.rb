# frozen_string_literal: true

FactoryBot.define do
  factory :recruitment do
    title { "MyString" }
    description { "MyText" }
    location { nil }
    event_date { "2024-05-12 08:55:46" }
    deadline { "2024-05-12 08:55:46" }
    status { 1 }
    type { 1 }
  end
end
