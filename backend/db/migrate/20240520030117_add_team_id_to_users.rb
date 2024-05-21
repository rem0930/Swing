class AddTeamIdToUsers < ActiveRecord::Migration[7.1]
  def change
    # team_idカラムが既に存在する場合に削除
    remove_column :users, :team_id, :integer, if_exists: true
    # 新しいデータ型で再追加
    add_column :users, :team_id, :bigint
    add_foreign_key :users, :teams
    add_index :users, :team_id
  end
end
