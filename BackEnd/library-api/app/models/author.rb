class Author < ApplicationRecord
    has_secure_password

    has_many :books, foreign_key: :written_by

    validates_presence_of :fname, :lname, :email, :password_digest
end
