# frozen_string_literal: true

class TeamsController < ApplicationController
  skip_before_action :authenticate_request, only: [:index, :show]
  before_action :set_team, only: [:show, :update, :destroy]
  before_action :check_owner, only: [:update, :destroy]

  # GET /teams
  def index
    @teams = Team.all
    render json: @teams
  end

  # GET /teams/:id
  def show
    render json: @team
  end

  # POST /teams
  def create
    @team = @current_user.teams.new(team_params)

    if @team.save
      render json: @team, status: :created, location: team_url(@team)
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /teams/:id
  def update
    if @team.update(team_params)
      render json: @team, status: :ok
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  # DELETE /teams/:id
  def destroy
    @team.destroy
    head :no_content
  end

  private
    def set_team
      @team = @current_user.teams.find(params[:id])
    end

    def team_params
      params.require(:team).permit(:name, :details, :profile_photo, :background_photo)
    end

    def check_owner
      unless @team.user_id == @current_user.id
        render json: { error: "この操作を行う権限がありません。"}, status: :forbidden
      end
    end
end
