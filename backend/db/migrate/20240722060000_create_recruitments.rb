class CreateRecruitments < ActiveRecord::Migration[7.1]
  def change
    create_table :recruitments do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.datetime :event_date
      t.datetime :deadline
      t.integer :status, default: 0
      t.integer :role, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.bigint :team_id, null: false
      t.string :address
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6

      t.index :team_id, name: "fk_rails_3ea6102900"
    end

    add_foreign_key :recruitments, :teams
  end
end
