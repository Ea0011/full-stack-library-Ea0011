class Book < ApplicationRecord
    validates_presence_of :name, :pages, :genre

    validates_presence_of :written_by
end
