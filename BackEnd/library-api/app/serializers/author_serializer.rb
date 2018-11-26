class AuthorSerializer < ActiveModel::Serializer
  attributes :id, :fname, :lname, :email

  has_many :books
end
