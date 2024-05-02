class Team < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 50 }
  validates :details, length: { maximum: 1000 }, allow_blank: true
end
