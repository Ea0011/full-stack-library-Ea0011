class ApplicationController < ActionController::API
    include Response, ExceptionHandler

    def authenticate
        # Implement author authentication for all controllers
        # make sure to skip authentication for routes that don't need this
    end
end
