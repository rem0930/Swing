# frozen_string_literal: true

class RecruitmentsController < ApplicationController
  before_action :authenticate_user, only: [:index, :create, :update, :destroy]
  before_action :set_recruitment, only: [:show, :update, :destroy]
  skip_before_action :authenticate_user, only: [:show, :by_team]

  # GET /recruitments
  def index
    recruitments = Recruitment.all.includes(:team)

    recruitments_with_flag = recruitments.map do |recruitment|
      is_user_team = false
      if @current_user
        user_team = @current_user.team
        is_user_team = (recruitment.team_id == user_team.id) if user_team
        Rails.logger.info "Recruitment ID: #{recruitment.id}, Team ID: #{recruitment.team_id}, User's Team ID: #{user_team&.id}"
      end
      RecruitmentSerializer.new(recruitment, is_user_team: is_user_team)
    end

    render json: recruitments_with_flag.map(&:as_json)
  end

  # GET /recruitments/by_team/:team_id
  def by_team
    team_id = params[:team_id]
    @recruitments = Recruitment.where(team_id: params[:team_id])
    render json: @recruitments
  end

  # GET /recruitments/1
  def show
    recruitment = Recruitment.find(params[:id])
    render json: @recruitment
  end

  # POST /recruitments
  def create
    @recruitment = current_user.team.recruitments.build(recruitment_params)
    @recruitment.status = :open # デフォルトでopenに設定
    if @recruitment.save
      render json: @recruitment, status: :created
    else
      render json: @recruitment.errors, status: :unprocessable_entity
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recruitment
      @recruitment = Recruitment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def recruitment_params
      params.require(:recruitment).permit(:title, :description, :role, :event_date, :deadline, :team_id)
    end
end
