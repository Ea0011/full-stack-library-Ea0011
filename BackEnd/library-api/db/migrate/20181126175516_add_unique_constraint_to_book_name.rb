class AddUniqueConstraintToBookName < ActiveRecord::Migration[5.2]
  def change
    add_index :books, :name, name: "book_by_title", unique: true
  end
end
