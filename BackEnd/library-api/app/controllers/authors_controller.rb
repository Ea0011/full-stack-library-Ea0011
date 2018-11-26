class AuthorsController < ApplicationController
    skip_before_action :authenticate, only: [:create, :index, :show]
    before_action :set_author, only: :show

    def create
        author = Author.create!(author_params)
        authentication = (AuthenticateUser.new(author.email, author.password).call)
        json_response({ message: "Account created!", auth_data: authentication }, :created)
    end

    def index
        authors = Author.all
        json_response(authors)
    end

    def show
        json_response(@author)
    end

    def update
        @current_author.update(author_params)
        json_response(@current_author)
    end

    def destroy
        @current_author.destroy
        head(:no_content)
    end
    
    private

    def set_author
        @author = Author.find(author_params[:id])
    end 

    def author_params
        params.permit(:fname, :lname, :email, :password, :password_confirmation)
    end
end
