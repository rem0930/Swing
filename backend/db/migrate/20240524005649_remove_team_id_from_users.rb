# frozen_string_literal: true

class RemoveTeamIdFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :users, column: :team_id

    remove_index :users, name: "index_users_on_team_id"
    remove_column :users, :team_id, :bigint
  end
end
