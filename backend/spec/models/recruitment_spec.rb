# frozen_string_literal: true

require "rails_helper"

RSpec.describe Recruitment, type: :model do
  let(:user) { User.create!(email: "test@example.com", password: "password", user_name: "User1") }
  let(:team) { Team.create!(name: "Warriors", user: user) }
  let(:recruitment) { FactoryBot.create(:recruitment) }

  describe "enums" do
    it "supports status enum" do
      expect(recruitment.status).to eq("open")
      recruitment.closed!
      expect(recruitment.status).to eq("closed")
    end

    it "supports role enum" do
      expect(recruitment.role).to eq("member")
      recruitment.opponent!
      expect(recruitment.role).to eq("opponent")
    end
  end
end
