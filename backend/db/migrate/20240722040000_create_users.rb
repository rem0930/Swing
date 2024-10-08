# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :user_name, null: false
      t.string :profile_photo
      t.string :background_photo
      t.text :bio
      t.boolean :admin, default: false

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
