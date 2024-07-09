# frozen_string_literal: true

module Api
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

      if @recruitment.nil?
        render json: { error: "Recruitment not found" }, status: :not_found
        return
      end

      @application = @recruitment.applications.build(user: @current_user)

      if @application.save
        render json: @application, status: :created
      else
        render json: @application.errors, status: :unprocessable_entity
      end
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
    end
  end
end
