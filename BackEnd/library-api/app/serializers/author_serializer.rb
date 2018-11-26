class AuthorSerializer < ActiveModel::Serializer
  attributes :id, :fname, :lname, :email, :written_by

  has_many :books
end
