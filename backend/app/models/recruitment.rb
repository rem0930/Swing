# frozen_string_literal: true

class Recruitment < ApplicationRecord
  has_many :applications, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :conversations
  belongs_to :team

  validates :title, presence: true
  validates :description, presence: true
  validates :role, presence: true
  validates :address, presence: true

  enum status: { open: 0, closed: 1 }
  enum role: { member: 0, opponent: 1, helper: 2 }

  after_initialize :set_default_status, if: :new_record?

  # 募集締め切りが過ぎた場合のステータスを更新するメソッド
  def self.update_expired_recruitments
    where("deadline < ?", Time.current).where(status: :open).update_all(status: :closed)
  end

  private
    def set_default_status
      self.status ||= :open
    end

    def role_in_japanese
      I18n.t("recruitment.roles.#{role}")
    end
end
