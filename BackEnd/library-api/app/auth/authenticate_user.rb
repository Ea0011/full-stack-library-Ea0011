# write tests for this class
class AuthenticateUser
    def initialize(email, password)
        @email = email
        @password = password
    end

    def call
        JsonWebToken.encode(author_id: author.id) if author
    end

    def author
        author = Author.find_by(email: @email)
        return user if user && user.authenticate(@password)

        raise(ExceptionHandler::AuthenticationError, "Invalid Credentials")
    end
end