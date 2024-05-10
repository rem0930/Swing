# frozen_string_literal: true

require "rails_helper"

RSpec.describe UsersController, type: :controller do
  # クッキー自体の確認を行うのではなく、クッキーを利用している機能（例えば認証）が期待通りに動作するかをテスト
  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new user and returns a JWT token" do
        post :create, params: { user: attributes_for(:user) }
        expect(response).to have_http_status(:created)
        expect(response.body).to include("token")
      end
    end

    context "with invalid parameters" do
      it "dose not create a user returns an error" do
        expect {
            post :create, params: { user: { email: "", password: "short", user_name: "" } }
          }.to change(User, :count).by(0)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("error")
      end
    end
  end
end
