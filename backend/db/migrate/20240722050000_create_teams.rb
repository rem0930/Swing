class CreateTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :teams do |t|
      t.bigint :user_id, null: false
      t.string :name
      t.text :details
      t.string :profile_photo
      t.string :background_photo
      t.timestamps
    end

    add_foreign_key :teams, :users
  end
end
