class ApplicationsController < ApplicationController
    before_action :authenticate_user! # 認証が必要な場合

    def create
        @recruitment = Recruitment.find(params[:recruitment_id])
        @application = @recruitment.applications.build(user: current_user)

        if @application.save
            render json: @application, status: :created
        else
            render json: @application.errors, status: :unprocessable_entity
        end
    end
end
