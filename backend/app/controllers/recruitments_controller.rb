# frozen_string_literal: true

class RecruitmentsController < ApplicationController
  before_action :authenticate_user, only: [:show, :create, :update, :destroy]
  before_action :set_recruitment, only: [:update, :destroy]
  skip_before_action :authenticate_user, only: [:index, :by_team]

  # GET /recruitments
  def index
    recruitments = Recruitment.order(created_at: :desc).includes(:team, :location)
    render json: recruitments, each_serializer: RecruitmentSerializer
  end

  # GET /recruitments/by_team/:team_id
  def by_team
    team_id = params[:team_id]
    @recruitments = Recruitment.order(created_at: :desc).where(team_id: params[:team_id])
    render json: @recruitments
  end

  # GET /recruitments/1
  def show
    begin
      recruitment = Recruitment.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Recruitment not found" }, status: :not_found
      return
    end

    user_team = @current_user.team
    is_user_team = (recruitment.team_id == user_team.id)

    render json: { recruitment: RecruitmentSerializer.new(recruitment), is_user_team: is_user_team }
  end

  # POST /recruitments
  def create
    @recruitment = current_user.team.recruitments.build(recruitment_params)
    @recruitment.location_id = 1
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
      params.require(:recruitment).permit(:title, :description, :role, :event_date, :deadline, :location_id, :team_id)
    end
end
