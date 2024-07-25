class CreateConversations < ActiveRecord::Migration[7.1]
  def change
    create_table :conversations do |t|
      t.string :title
      t.bigint :recruitment_id

      t.timestamps
    end
    add_foreign_key :conversations, :recruitments
  end
end
