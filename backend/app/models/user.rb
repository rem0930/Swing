# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  belongs_to :location, optional: true
  belongs_to :team, optional: true

  # バリデーション
  validates :email, presence: true, uniqueness: true
  validates :user_name, presence: true
  validates :password, length: { minimum: 8 }, if: -> { new_record? || !password.nil? }

  # Associations
  has_one :team, dependent: :destroy
  has_many :applications, dependent: :destroy
  has_many :favorites, dependent: :destroy

  mount_uploader :profile_photo, ProfilePhotoUploader

  # JWTトークン生成メソッド
  def generate_token
    JWT.encode({ user_id: self.id, exp: 24.hours.from_now.to_i }, Rails.application.credentials.jwt_secret_key)
  end

  class NotAuthorized < StandardError; end
end
