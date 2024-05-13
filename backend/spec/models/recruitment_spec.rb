# frozen_string_literal: true

require "rails_helper"

RSpec.describe Recruitment, type: :model do
  let(:user) { User.create!(email: "test@example.com", password: "password", user_name: "User1") }
  let(:location) { Location.create!(name: "Local Park", latitude: 35.6895, longitude: 139.6917) }
  let(:team) { Team.create!(name: "Warriors", user: user) }
  let(:recruitment) { Recruitment.create!(title: "Need Players", description: "Join us!", status: "open", role: "member", location: location, team: team) }

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
