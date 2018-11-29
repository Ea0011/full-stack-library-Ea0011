class BooksController < ApplicationController
    before_action :set_book, only: [:show, :destroy, :update]
    skip_before_action :authenticate, only: [:show, :index, :search]

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
        else
            raise(ExceptionHandler::AuthenticationError, "Not Authorized")
        end
    end

    def update
        book = current_author&.books&.where(id: params[:id]).first
        if book
            book.update(book_params)
            json_response(book)
        else
            raise(ExceptionHandler::AuthenticationError, "Not Authorized")
        end
    end

    def destroy
        book = current_author&.books&.find(params[:id])
        if book
            book.destroy
            head(:no_content)
        else
            raise(ExceptionHandler::AuthenticationError, "Not Authorized")
        end
    end

    def search
        books = Book.search(params[:text])
        json_response(books)
    end

    private

    def set_book
        @book = Book.find(params[:id])
    end

    def book_params
        params.permit(:name, :pages, :genre, :description)
    end
end
