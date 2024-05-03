# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  # バリデーション
  validates :email, presence: true, uniqueness: true
  validates :user_name, presence: true
  validates :password, presence: true, length: { minimum: 6 }

  # Associations
  has_many :teams, dependent: :destroy

  # JWTトークン生成メソッド
  def generate_jwt
    JWT.encode({ id: self.id, exp: 24.hours.from_now.to_i }, Rails.application.credentials.jwt_secret_key)
  end
end
