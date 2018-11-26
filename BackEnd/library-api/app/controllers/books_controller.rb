class BooksController < ApplicationController
    before_action :set_book, only: [:show, :destroy, :update]
    skip_before_action :authenticate, only: [:show, :index]

    def index
        @books = Book.all
        json_response(@books)
    end

    def show
        json_response(@book)
    end

    def create
        book = current_author&.books&.create!(book_params)
        if book
            json_response(book, :created)
        end
            raise(ExceptionHandler::AuthenticationError, "Not Authorized")
    end

    def update
        book = current_author&.books&.find(params[:id])
        if book
            book.update(book_params)
            json_response(book)
        end
            raise(ExceptionHandler::AuthenticationError, "Not Authorized")
    end

    def destroy
        book = current_author&.books&.find(paramsp[:id])
        if book
            book.destroy
            head(:no_content)
        end
            raise(ExceptionHandler::AuthenticationError, "Not Authorized")
    end

    private

    def set_book
        @book = Book.find(params[:id])
    end

    def book_params
        params.permit(:name, :pages, :genre, :description)
    end
end
