class CreateRecruitments < ActiveRecord::Migration[7.1]
  def change
    create_table :recruitments do |t|
      t.string :title, limit: 255, null: false
      t.text :description, null: false
      t.references :location, null: false, foreign_key: true
      t.datetime :event_date
      t.datetime :deadline
      t.integer :status, default: 0  # status を整数型にしてデフォルト値を 'open' に対応する0に設定
      t.integer :type, null: false   # type も整数型に
      t.timestamps
    end
  end
end