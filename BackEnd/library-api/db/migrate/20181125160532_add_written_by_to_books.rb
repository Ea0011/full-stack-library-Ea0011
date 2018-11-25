class AddWrittenByToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :written_by, :string
  end
end
