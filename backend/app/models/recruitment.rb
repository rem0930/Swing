class Recruitment < ApplicationRecord
  belongs_to :location
  belongs_to :team

  validates :title, presence: true
  validates :description, presence: true
  validates :type, presence: true

  enum status: { open: 0, closed: 1 }
  enum type: { member: 0, opponent: 1, helper: 2 }

  # 必要に応じてその他のメソッドやバリデーションを追加
end
