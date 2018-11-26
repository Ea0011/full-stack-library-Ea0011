require 'rails_helper'

RSpec.describe AuthorizeApiRequest do
    let(:author) { create(:author) }
    let(:header) { { "Authorization" => token_generator(author.id) } }

    subject(:invalid_request) { described_class.new({}) }

    subject(:valid_request) { described_class.new(header) }

    describe '#call' do
        context 'valid request' do
            it 'should return the author' do
                result = valid_request.call
                expect(result[:author]).to eq(author)
            end
        end

        context 'invalid request' do
            context 'missing token' do
                it 'should raise missing token error' do
                    expect { invalid_request.call }
                        .to raise_error(ExceptionHandler::MissingToken, "Missing Token")
                end
            end

            context 'invalid token' do
                # create described class with invalid token
                subject(:invalid_request) do
                    described_class.new({ "Authorization" => "Hey I am an invalid token" })
                end

                it 'should raise invalid token error' do
                    expect { invalid_request.call }
                        .to raise_error(ExceptionHandler::InvalidToken, "Invalid Token")
                end
            end

            context 'expired token' do
                # create described class with expired token
                subject(:invalid_request) do
                    described_class.new({ "Authorization" => expired_token_generator(author.id) })
                end

                it 'should raise expired token error' do
                    expect { invalid_request.call }
                        .to raise_error(ExceptionHandler::InvalidToken, "Invalid Token")
                end
            end
        end
    end
end