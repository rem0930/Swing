# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      user = User.new(email: "test@example.com", user_name: "testuser", password: "password123")
      expect(user).to be_valid
    end

    it "validates presence of email" do
      user = User.new(email: nil, user_name: "testuser", password: "password123")
      user.valid?
      expect(user.errors[:email]).to include("を入力してください")
    end

    it "is not valid without an email" do
      user = User.new(user_name: "testuser", password: "password123")
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("を入力してください")
    end

    it "is not valid without a user_name" do
      user = User.new(email: "test@example.com", password: "password123")
      expect(user).not_to be_valid
      expect(user.errors[:user_name]).to include("を入力してください")
    end

    it "is not valid without a password" do
      user = User.new(email: "test@example.com", user_name: "testuser")
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("を入力してください")
    end

    it "is not valid with a password shorter than the minimum length" do
      user = User.new(email: "test@example.com", user_name: "testuser", password: "pass")
      user.valid?
      expect(user.errors[:password]).not_to be_empty
    end

    it "ensures email uniqueness" do
      User.create!(email: "test@example.com", user_name: "testuser", password: "password123")
      duplicate_user = User.new(email: "test@example.com", user_name: "newuser", password: "newpassword")
      duplicate_user.valid?
      expect(duplicate_user.errors[:email]).to include("はすでに存在します")
    end
  end

  # JWTトークン生成メソッドのテスト
  describe "#generate_token" do
    it "generates a valid JWT token" do
      user = User.create!(email: "test@example.com", user_name: "testuser", password: "password123")
      token = user.generate_token
      decoded_token = JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, { algorithm: "HS256" })

      # トークンの内容を検証
      expect(decoded_token.first["user_id"]).to eq(user.id)

      # トークンの有効期限を検証,実際の期限が予想される時間から最大5秒の範囲内
      expect(decoded_token.first["exp"]).to be_within(5).of(24.hours.from_now.to_i)
    end
  end

  # アソシエーションのテスト
  describe "association" do
    it "has one team" do
      expect(User.reflect_on_association(:team).macro).to eq(:has_one)
    end

    it "has many applications" do
      expect(User.reflect_on_association(:applications).macro).to eq(:has_many)
    end

    it "has many favorites" do
      expect(User.reflect_on_association(:favorites).macro).to eq(:has_many)
    end

    it "belongs to location optionally" do
      expect(User.reflect_on_association(:location).macro).to eq(:belongs_to)
      expect(User.reflect_on_association(:location).options[:optional]).to be_truthy
    end
  end
end
