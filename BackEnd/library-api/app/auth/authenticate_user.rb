# write tests for this class
class AuthenticateUser
    def initialize(email, password)
        @email = email
        @password = password
    end

    def call
        current_author = author
        token = JsonWebToken.encode({ author_id: current_author&.id })
        current_author.update(authentication_token: token)
        {
            author: current_author
        }
    end

    def author
        author = Author.where(email: @email).first
        return author if author && author.authenticate(@password)

        raise(ExceptionHandler::AuthenticationError, "Invalid Credentials")
    end
end