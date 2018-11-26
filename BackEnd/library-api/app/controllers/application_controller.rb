class ApplicationController < ActionController::API
    include Response, ExceptionHandler

    attr_reader :current_author
    before_action :authenticate

    private

    def authenticate
        # Implement author authentication for all controllers
        # make sure to skip authentication for routes that don't need this
        @current_author = (AuthorizeApiRequest.new(request.headers).call)[:author]
    end
end
