# frozen_string_literal: true

module Api
  class FavoritesController < ApplicationController
    before_action :authenticate_user

    # POST /favorites
    def create
      @recruitment = Recruitment.find(params[:recruitment_id])

      if @recruitment.nil?
        render json: { error: "Recruitment not found" }, status: :not_found
        return
      end

      @favorite = @recruitment.favorites.build(user: @current_user)

      if @favorite.save
        render json: @favorite, status: :created
      else
        render json: @favorite.errors, status: :unprocessable_entity
      end
    end

    # GET /favorites
    def index
      @favorites = current_user.favorites.order(created_at: :desc).includes(:recruitment)

      render json: @favorites.to_json(include: { recruitment: { only: [:id, :title, :description, :event_date, :deadline, :location_id, :role, :status] } })
    end

    # DELETE /favorites/:id
    def destroy
      @favorite = current_user.favorites.find(params[:id])

      if @favorite.destroy
        render json: { message: "Favorite removed" }, status: :ok
      else
        render json: { error: "Failed to remove favorite" }, status: :unprocessable_entity
      end
    end
  end
end
