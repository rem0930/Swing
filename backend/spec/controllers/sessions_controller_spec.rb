# frozen_string_literal: true

require "rails_helper"
RSpec.describe SessionsController, type: :request do
  let(:user) { FactoryBot.create(:user, email: "user@example.com", password: "securepassword") }

  it "returns error message for invalid password" do
    post "/api/login", params: { email: user.email, password: "wrongpassword" }
    expect(response).to have_http_status(:unauthorized)
    expect(json["error"]).to eq("Invalid password")
  end

  it "returns error message for invalid email" do
    post "/api/login", params: { email: "wrong@example.com", password: "securepassword" }
    expect(response).to have_http_status(:unauthorized)
    expect(json["error"]).to eq("Email not found")
  end
end
