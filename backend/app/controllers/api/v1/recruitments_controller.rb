# frozen_string_literal: true

module Api
  module V1
    class RecruitmentsController < ApplicationController
      before_action :set_recruitment, only: [:show, :update, :destroy, :close]
      before_action :authenticate_user, except: [:index, :by_team, :show]
      before_action :set_current_user, only: [:show]

      # GET /recruitments
      def index
        status = params[:status]
        role = params[:role]

        recruitments = Recruitment.order(created_at: :desc).includes(:team)
        recruitments = recruitments.where(status: status) if status.present?
        recruitments = recruitments.where(role: role) if role.present?

        render json: recruitments, each_serializer: RecruitmentSerializer
      end

      # GET /recruitments/by_team/:team_id
      def by_team
        params[:team_id]
        @recruitments = Recruitment.where(team_id: params[:team_id]).order(created_at: :desc)
        render json: @recruitments
      end

      # GET /recruitments/1
      def show
        if @recruitment.nil?
          render json: { error: "Recruitment not found" }, status: :not_found
          return
        end

        user_team = @current_user&.team
        is_user_team = user_team ? (@recruitment.team_id == user_team.id) : false
        is_applied = @current_user ? @recruitment.applications.exists?(user: @current_user) : false

        render json: {
          recruitment: RecruitmentSerializer.new(@recruitment),
          is_user_team: is_user_team,
          is_applied: is_applied
        }
      end

      # POST /recruitments
      def create
        recruitment = current_user.team.recruitments.build(recruitment_params)
        if recruitment.save
          render json: recruitment, status: :created
        else
          render json: recruitment.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /recruitments/1
      def update
        if @recruitment.update(recruitment_params)
          render json: @recruitment
        else
          render json: @recruitment.errors, status: :unprocessable_entity
        end
      end

      # DELETE /recruitments/1
      def destroy
        @recruitment.destroy
        head :no_content
      end

      # 募集を締め切る
      def close
        if @recruitment.team_id != @current_user.team.id
          render json: { error: "権限がありません" }, status: :forbidden
          return
        end

        ActiveRecord::Base.transaction do
          if @recruitment.update(status: :closed)
            render json: @recruitment, status: :ok
          else
            render json: { error: @recruitment.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_recruitment
          @recruitment = Recruitment.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def recruitment_params
          params.require(:recruitment).permit(
            :title,
            :description,
            :event_date,
            :deadline,
            :status,
            :role,
            :team_id,
            :address,
            :latitude,
            :longitude
          )
        end
    end
  end
end
