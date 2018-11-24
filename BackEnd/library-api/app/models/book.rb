class Book < ApplicationRecord
    validates_presence_of :name, :pages, :genre
end
