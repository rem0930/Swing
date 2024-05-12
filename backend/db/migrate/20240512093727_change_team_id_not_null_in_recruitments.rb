class ChangeTeamIdNotNullInRecruitments < ActiveRecord::Migration[7.1]
  def change
    change_column_null :recruitments, :team_id, false
  end
end
