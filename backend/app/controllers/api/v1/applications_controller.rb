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
        @application = @recruitment.applications.build(user: current_user)

        if @application.save
          @conversation = Conversation.create(recruitment: @recruitment)
          @conversation.users << current_user
          @conversation.users << @recruitment.team.user

          Message.create(
            content: "ご応募ありがとうございます！#{@recruitment.team.name}です。このチャットで詳細を確認させていただきます。",
            sender: @recruitment.team.user,
            recipient: current_user,
            conversation: @conversation
          )

          render json: { message: "応募が完了しました", conversation_id: @conversation.id }, status: :created
        else
          render json: { error: "応募に失敗しました" }, status: :unprocessable_entity
        end
      end

      # GET /applications/check?recruitment_id=:recruitment_id
      def check
        if current_user
          recruitment = Recruitment.find(params[:recruitment_id])
          is_applied = recruitment.applications.exists?(user: current_user)
          render json: { is_applied: is_applied }
        else
          render json: { is_applied: false }
        end
      rescue ActiveRecord::RecordNotFound
        render json: { is_applied: false }
      end

      def close
        @recruitment.status = "closed"
        if @recruitment.save
          render json: @recruitment, status: :ok
        else
          render json: @recruitment.errors, status: :unprocessable_entity
        end
      end
    end
  end
end
