class AlterDataTypeOnWrittenBy < ActiveRecord::Migration[5.2]
  def change
    change_column :books, :written_by, :integer
  end
end
