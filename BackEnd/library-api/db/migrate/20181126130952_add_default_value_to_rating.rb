class AddDefaultValueToRating < ActiveRecord::Migration[5.2]
  def change
    change_column :books, :rating, :type, default: 0
  end
end
