module ExceptionHandler
    extend ActiveSupport::Concern

    # generate custom errors to be handled
    class InvalidToken < StandardError; end
    class MissingToken < StandardError; end
    class ExpiredToken < StandardError; end

    included do
        rescue_from ActiveRecord::RecordNotFound do |e|
            json_response({ message: e.message }, :not_found)
        end

        rescue_from ActiveRecord::RecordInvalid, with: :four_two_two

        rescue_from ExceptionHandler::InvalidToken, with: :four_two_two 
    end

    private

    def four_two_two(e)
        json_response({ message: e.message }, :unprocessable_entity)
    end

    def four_zero_one(e)
        json_response({ message: e.message }, :unauthorized)
    end
end 