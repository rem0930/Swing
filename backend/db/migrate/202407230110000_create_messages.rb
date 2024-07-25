class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.text :content
      t.bigint :sender_id, null: false
      t.bigint :recipient_id, null: false
      t.bigint :conversation_id
      t.timestamps
    end

    add_index :messages, :sender_id
    add_index :messages, :recipient_id
    add_index :messages, :conversation_id
    add_foreign_key :messages, :users, column: :sender_id
    add_foreign_key :messages, :users, column: :recipient_id
    add_foreign_key :messages, :conversations
  end
end
