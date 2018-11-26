class BookSerializer < ActiveModel::Serializer
  attributes :id, :name, :genre, :description, :pages

  belongs_to :author
end
