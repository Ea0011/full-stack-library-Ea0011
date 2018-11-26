class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :name
      t.integer :pages
      t.string :genre
      t.integer :rating
      t.text :description
      t.string :written_by

      t.timestamps
    end
  end
end
