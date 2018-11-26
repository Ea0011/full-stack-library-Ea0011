class AuthorizeApiRequest
    def initialize(headers)
        @headers = headers
    end

    def call
        {
            author: author
        }
    end

    private

    def author
        @author = Author.where(authentication_token: auth_header).first
        # @author = Author.find(decoded_token[:author_id]) if decoded_token

        rescue ActiveRecord::RecordNotFound => e
            raise(ExceptionHandler::InvalidToken, "Invalid Token")
    end

    def decoded_token
        @decoded_token = JsonWebToken.decode(auth_header)
    end

    def auth_header
        if @headers["Authorization"].present?
            return @headers["Authorization"].split(' ').last
        end
            raise(ExceptionHandler::MissingToken, "Missing Token")
    end
end