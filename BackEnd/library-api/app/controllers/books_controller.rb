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
        book = current_author.books.create!(book_params)
        json_response(book, :created)
    end

    def update
        book = current_author.books.find(params[:id])
        @current_author.books.find(params[:id]).update(book_params)
        json_response(book)
    end

    def destroy
        @current_author.books.find(params[:id]).destroy
    end

    private

    def set_book
        @book = Book.find(params[:id])
    end

    def book_params
        params.permit(:name, :pages, :genre, :description)
    end
end
