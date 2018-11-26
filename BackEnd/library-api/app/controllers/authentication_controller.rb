class AuthenticationController < ApplicationController
    skip_before_action :authenticate, only: :login

    def login
        authent_author = AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
        json_response(authent_author)
    end

    private

    def auth_params
        params.permit(:email, :password)
    end
end
