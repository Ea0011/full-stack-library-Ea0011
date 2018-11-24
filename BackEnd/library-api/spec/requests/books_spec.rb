require 'rails_helper'

RSpec.describe 'Books API', type: :request do
    # create books for testing
    let!(:books) { create_list(:book, 10) }
    let(:book_id) { books.first.id }

    describe 'GET /books' do
        # make api call before runing unit tests
        before { get '/books' }

        it 'returns books' do
            expect(json).not_to be_empty
            expect(json.size).to eq(10)
        end

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end
    end

    describe 'GET /books/:id' do
        context 'When the book exists' do
            # make api call before runing unit tests
            before { get "/books/#{book_id}" }

            it 'returns the book' do
                expect(json['name']).to eq(books.first['name'])
            end

            it 'returns status 200' do
                expect(response).to have_http_status(200)
            end
        end

        context 'When the book is missing' do
            # simulate wrong id
            let(:book_id) { 598 }
            before { get "/books/#{book_id}" }

            it 'returns status 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns return missing book error message' do
                expect(response.body).to match(/Couldn't find Book with 'id'=598/)
            end
        end
    end

    describe 'DELETE /books/:id' do
        # make api call before runing unit tests
        before { delete "/books/#{book_id}" }

        it 'returns status 204' do
            expect(response).to have_http_status(204)
        end 
    end

    describe 'POST /books' do
        let!(:valid_data) { { name: 'The Da Vinci Code', pages: 500, genre: "Detective" } }

        context 'valid data passed' do
            # make api call before runing unit tests
            before { post '/books', params: valid_data }

            it 'creates a book' do
                expect(json['name']).to eq('The Da Vinci Code')
            end

            it 'returns status 201' do
                expect(response).to have_http_status(201)
            end
        end

        context 'invalid data passed' do
            # simulate wrong data
            let(:invalid_data) { { title: "A Book" } }

            before { post '/books', params: invalid_data }

            it 'returns status 422' do
                expect(response).to have_http_status(422)
            end
        end
    end

    describe 'PUT /books/:id' do
        let(:valid_data) { { pages: 200 } }

        context 'valid data passed' do
            # make api call before running unit tests
            before { put "/books/#{book_id}", params: valid_data }

            it 'updates the book' do
                expect(json['pages']).to eq(200)
            end

            it 'returns status 200' do
                expect(response).to have_http_status(200)
            end
        end
    end
end