require 'rails_helper'

RSpec.describe Api::V1::ApplicationsController, type: :controller do
  let(:user) { create(:user) }
  let(:team) { create(:team, user: user) }
  let(:recruitment) { create(:recruitment, team: team) }

  before do
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Application" do
        expect {
          post :create, params: { recruitment_id: recruitment.id, application: { recruitment_id: recruitment.id } }
        }.to change(Application, :count).by(1)
      end

      it "creates a new Conversation and Message" do
        expect {
          post :create, params: { recruitment_id: recruitment.id, application: { recruitment_id: recruitment.id } }
        }.to change(Conversation, :count).by(1).and change(Message, :count).by(1)
      end

      it "renders a JSON response with the new application" do
        post :create, params: { recruitment_id: recruitment.id, application: { recruitment_id: recruitment.id } }
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new application" do
        post :create, params: { recruitment_id: nil }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "GET #check" do
    context "when the user is authenticated" do
      it "returns true if the user has applied" do
        create(:application, recruitment: recruitment, user: user)
        get :check, params: { recruitment_id: recruitment.id }
        expect(JSON.parse(response.body)['is_applied']).to be_truthy
      end

      it "returns false if the user has not applied" do
        get :check, params: { recruitment_id: recruitment.id }
        expect(JSON.parse(response.body)['is_applied']).to be_falsey
      end
    end

    context "when the recruitment is not found" do
      it "returns false" do
        get :check, params: { recruitment_id: -1 }
        expect(JSON.parse(response.body)['is_applied']).to be_falsey
      end
    end
  end
end
