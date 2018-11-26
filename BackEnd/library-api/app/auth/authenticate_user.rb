# write tests for this class
class AuthenticateUser
    def initialize(email, password)
        @email = email
        @password = password
    end

    def call
        current_author = author
        {
            token: JsonWebToken.encode({ author_id: current_author&.id }),
            fname: current_author.fname,
            lname: current_author.lname
        }
    end

    def author
        author = Author.find_by(email: @email)
        return author if author && author.authenticate(@password)

        raise(ExceptionHandler::AuthenticationError, "Invalid Credentials")
    end
end