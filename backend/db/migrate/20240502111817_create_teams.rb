# frozen_string_literal: true

class CreateTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :teams do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.text :details

      t.timestamps
    end
  end
end
