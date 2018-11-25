class BooksController < ApplicationController
    before_action :set_book, only: [:show, :destroy, :update]

    def index
        @books = Book.all
        json_response(@books)
    end

    def show
        json_response(@book)
    end

    def create
        book = Book.create!(book_params)
        json_response(book, :created)
    end

    def update
        @book.update(book_params)
        json_response(@book)
    end

    def destroy
        @book.destroy
    end

    private

    def set_book
        @book = Book.find(params[:id])
    end

    def book_params
        params.permit(:name, :pages, :genre, :description, :written_by)
    end 
end
