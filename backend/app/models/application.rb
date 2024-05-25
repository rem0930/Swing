# frozen_string_literal: true

class Application < ApplicationRecord
  belongs_to :user
  belongs_to :recruitment

  validates :user_id, presence: true
  validates :recruitment_id, presence: true
  validates :user_id, uniqueness: { scope: :recruitment_id, message: "has already applied to this recruitment" }
end
