class AddCascadeToTeamAssociations < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :recruitments, :teams
    remove_foreign_key :teams, :users
    
    add_foreign_key :recruitments, :teams, on_delete: :cascade
    add_foreign_key :teams, :users, on_delete: :cascade

    remove_foreign_key :applications, :recruitments
    add_foreign_key :applications, :recruitments, on_delete: :cascade

    remove_foreign_key :favorites, :recruitments
    add_foreign_key :favorites, :recruitments, on_delete: :cascade

    remove_foreign_key :conversations, :recruitments
    add_foreign_key :conversations, :recruitments, on_delete: :cascade

    remove_foreign_key :conversations_users, :conversations
    add_foreign_key :conversations_users, :conversations, on_delete: :cascade

    remove_foreign_key :messages, :conversations
    add_foreign_key :messages, :conversations, on_delete: :cascade
  end
end
