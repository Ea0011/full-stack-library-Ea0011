class AuthenticationController < ApplicationController
    skip_before_action :authenticate, only: :login

    def login
        authent_author = AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
        json_response(authent_author)
    end

    def logout
        current_author.update(authentication_token: nil)
        head(:no_content)
    end

    private

    def auth_params
        params.permit(:email, :password)
    end
end
