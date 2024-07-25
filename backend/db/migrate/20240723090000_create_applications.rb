class CreateApplications < ActiveRecord::Migration[7.1]
  def change
    create_table :applications do |t|
      t.bigint :user_id, null: false
      t.bigint :recruitment_id, null: false
      t.timestamps
    end

    add_index :applications, :user_id
    add_index :applications, :recruitment_id
    add_foreign_key :applications, :users
    add_foreign_key :applications, :recruitments
  end
end
