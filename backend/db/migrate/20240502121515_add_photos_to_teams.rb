class AddPhotosToTeams < ActiveRecord::Migration[7.1]
  def change
    add_column :teams, :profile_photo, :string
    add_column :teams, :background_photo, :string
  end
end
