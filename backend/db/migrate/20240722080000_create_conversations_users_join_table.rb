class CreateConversationsUsersJoinTable < ActiveRecord::Migration[7.1]
  def change
    create_table :conversations_users, id: false do |t|
      t.bigint :conversation_id, null: false
      t.bigint :user_id, null: false
    end

    add_index :conversations_users, :conversation_id
    add_index :conversations_users, :user_id
    add_foreign_key :conversations_users, :conversations
    add_foreign_key :conversations_users, :users
  end
end
