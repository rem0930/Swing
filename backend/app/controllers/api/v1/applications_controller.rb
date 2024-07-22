# frozen_string_literal: true

module Api
  module V1
    class ApplicationsController < ApplicationController
      before_action :authenticate_user, except: [:check]

      # GET /applications
      def index
        @applications = current_user.applications.order(created_at: :desc).includes(:recruitment)
        render json: @applications, include: { recruitment: { only: [:id, :title, :description, :event_date, :deadline, :address, :latitude, :longitude, :role, :status] } }
      end

      # POST /applications
      def create
        @recruitment = Recruitment.find(params[:recruitment_id])

        @application = @recruitment.applications.build(user: @current_user)

        if @application.save
          begin
            # 応募完了後に会話とメッセージを作成する
            @conversation = Conversation.create!(recruitment: @recruitment)
            Message.create!(
              sender_id: @recruitment.team.user_id,
              recipient_id: @current_user.id,
              conversation_id: @conversation.id,
              content: "ご応募ありがとうございます。このチャットで詳細を確認させていただきます。"
            )

            render json: { application: @application, conversation_id: @conversation.id }, status: :created
          rescue StandardError => e
            logger.error "Error creating conversation and message: #{e.message}"
            render json: { error: "Error creating conversation and message" }, status: :internal_server_error
          end
        else
          render json: @application.errors, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Recruitment not found" }, status: :not_found
      end

      # GET /applications/check?recruitment_id=:recruitment_id
      def check
        if @current_user
          recruitment = Recruitment.find(params[:recruitment_id])
          is_applied = recruitment.applications.exists?(user: @current_user)
          render json: { is_applied: is_applied }
        else
          render json: { is_applied: false }
        end
      rescue ActiveRecord::RecordNotFound
        render json: { is_applied: false }
      end
    end
  end
end
