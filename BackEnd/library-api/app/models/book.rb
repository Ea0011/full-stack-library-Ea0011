class Book < ApplicationRecord
    validates_presence_of :name, :pages, :genre

    belongs_to :author, class_name: 'Author', foreign_key: 'written_by'

    validates_presence_of :written_by

    def self.search(params)
        if params
            where(['name LIKE ?', "%#{params}%"])
        else
            all
        end
    end
end
