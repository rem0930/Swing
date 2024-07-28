# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    content { "MyText" }
    sender { nil }
    recipient { nil }
  end
end