# frozen_string_literal: true

# RSpec.describe Api::SessionsController, type: :request do
#   let(:user) { FactoryBot.create(:user, email: "user@example.com", password: "securepassword") }

#   it "returns error message for invalid password" do
#     post "/api/login", params: { email: user.email, password: "wrongpassword" }
#     # expect(response).to have_http_status(:unauthorized)
#     expect(json["error"]).to eq("Invalid password")
#   end

#   it "returns error message for invalid email" do
#     post "/api/login", params: { email: "wrong@example.com", password: "securepassword" }
#     # expect(response).to have_http_status(:not_found)
#     expect(json["error"]).to eq("Email not found") # 変更: エラーメッセージを変更
#   end

#   private

#   def json
#     JSON.parse(response.body)
#   end
# end
