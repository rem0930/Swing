# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    user_name { "John Doe" }
    email { "john@example.com" }
    password { "securepassword" }
  end
end
