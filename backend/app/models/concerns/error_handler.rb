# frozen_string_literal: true

module ErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from User::NotAuthorized, with: :user_not_authorized
  end

    private
      def record_not_found(exception)
        render json: { error: "Record not found", message: exception.message }, status: :not_found
      end

      def record_invalid(exception)
        render json: { error: "Invalid record", messages: exception.record.errors.full_messages }, status: :unprocessable_entity
      end

      def user_not_authorized
        render json: { error: "Not authorized" }, status: :unauthorized
      end
end
