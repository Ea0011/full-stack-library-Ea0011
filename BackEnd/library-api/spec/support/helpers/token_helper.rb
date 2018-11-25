module TokenHelper
    def token_generator(author_id)
        JsonWebToken.encode(author_id: author_id)
    end

    def expired_token_generator(author_id)
        JsonWebToken.encode({ author_id: author_id }, (Time.now.to_i - 10))
    end

    def valid_headers
        {
            "Authorization" => token_generator(author.id),
            "Content-Type" => "application/json"
        }
    end

    def invalid_headers
        {
            "Authorization" => nil,
            "Content-Type" => "application/json"
        }
    end
end