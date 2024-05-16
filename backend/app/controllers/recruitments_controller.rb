# frozen_string_literal: true

class RecruitmentsController < ApplicationController
  before_action :set_recruitment, only: [:show, :update, :destroy]
  skip_before_action :authenticate_user, only: [:index, :show]

  # GET /recruitments
  def index
    @recruitments = Recruitment.all
    render json: @recruitments
  end

  # GET /recruitments/1
  def show
    recruitment = Recruitment.find(params[:id])
    render json: recruitment
  end

  # POST /recruitments
  def create
    @recruitment = @team.recruitments.build(recruitment_params)
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
      params.require(:recruitment).permit(:title, :description, :role, :event_date, :deadline)
    end
end
