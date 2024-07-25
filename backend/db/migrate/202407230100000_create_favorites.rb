class CreateFavorites < ActiveRecord::Migration[7.1]
  def change
    create_table :favorites do |t|
      t.bigint :user_id, null: false
      t.bigint :recruitment_id, null: false
      t.timestamps
    end

    add_index :favorites, :user_id
    add_index :favorites, :recruitment_id
    add_foreign_key :favorites, :users
    add_foreign_key :favorites, :recruitments
  end
end
