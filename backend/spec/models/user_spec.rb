# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  describe "validatios" do
    it "is valid with valid attributes" do
      user = User.new(email: "test@example.com", user_name: "testuser", password: "password123")
      expect(user).to be_valid
    end

    it "is valid without an email" do
      user = User.new(user_name: "testuser", password: "password123")
      expect(user).not_to be_valid
    end

    it "is valid without a user_name" do
      user = User.new(email: "test@example.com", password: "password123")
      expect(user).not_to be_valid
    end

    it "is valid without password" do
      user = User.new(email: "test@example.com", user_name: "testuser")
      expect(user).not_to be_valid
    end

    it "is valid without " do
      user = User.new(email: "test@example.com", user_name: "testuser", password: "pass")
      expect(user).not_to be_valid
    end

    it "ensures email uniqueness" do
      User.create!(email: "test@example.com", user_name: "testuser", password: "password123")
      duplicate_user = User.new(email: "test@example.com", user_name: "newuser", password: "newpassword")
      expect(duplicate_user).not_to be_valid
    end
  end

  # JWTトークン生成メソッドのテスト
  describe "#generate_jwt" do
    it "generates a valid JWT token" do
      user = User.create!(email: "test@example.com", user_name: "testuser", password: "password123")
      token = user.generate_jwt
      decoded_token = JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, algorithm: "HS256")
      expect(decoded_token.first["id"]).to eq(user.id)
    end
  end

  # アソシエーションのテスト
  describe "association" do
    it "has many teams" do
      expect(User.reflect_on_association(:teams).macro).to eq(:has_many)
    end

    it "belongs to location optionally" do
      expect(User.reflect_on_association(:location).macro).to eq(:belongs_to)
      expect(User.reflect_on_association(:location).options[:optional]).to be_truthy
    end
  end
end
