# frozen_string_literal: true

class ModifyForeignKey < ActiveRecord::Migration[7.1]
  def change
    # Remove foreign key constraint from users table
    if foreign_key_exists?(:users, :location)
      remove_foreign_key :users, :locations
    end

    # Remove the column location_id from users if it exists
    if column_exists?(:users, :location_id)
      remove_column :users, :location_id
    end

    # Remove the column location_id from recruitments if it exists
    if column_exists?(:recruitments, :location_id)
      remove_column :recruitments, :location_id
    end

    # Remove the locations table
    if table_exists?(:locations)
      drop_table :locations
    end
  end
end
