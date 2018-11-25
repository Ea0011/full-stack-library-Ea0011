class JsonWebToken

    HMAC_SECRET = "This is the secret message"

    def self.encode(data, exp = 24.hours.from_now)
        data[:exp] = exp.to_i

        JWT.encode(data, HMAC_SECRET)
    end

    def self.decode(token)
        data = JWT.decode(token, HMAC_SECRET)[0]
        HashWithIndifferentAccess.new(data)

        rescue JWT::DecodeError => e
            raise ExceptionHandler::InvalidToken, "Invalid Token"
    end

end