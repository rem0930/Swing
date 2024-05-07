# frozen_string_literal: true

class AddLocationIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :location, foreign_key: true
  end
end
