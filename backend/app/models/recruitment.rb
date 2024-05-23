# frozen_string_literal: true

class Recruitment < ApplicationRecord
  has_many :applications, dependent: :destroy
  belongs_to :location
  belongs_to :team

  validates :title, presence: true
  validates :description, presence: true
  validates :role, presence: true

  enum status: { open: 0, closed: 1 }
  enum role: { member: 0, opponent: 1, helper: 2 }

  after_initialize :set_default_status, if: :new_record?

  private
    def set_default_status
      self.status ||= :open
    end

    def role_in_japanese
      I18n.t("recruitment.roles.#{role}")
    end
end
