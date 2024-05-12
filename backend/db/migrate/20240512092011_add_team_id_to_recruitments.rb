class AddTeamIdToRecruitments < ActiveRecord::Migration[7.1]
  def change
    add_column :recruitments, :team_id, :bigint
    add_foreign_key :recruitments, :teams
  end
end
