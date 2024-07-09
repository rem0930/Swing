# frozen_string_literal: true

class AddAddressToRecruitments < ActiveRecord::Migration[7.1]
  def change
    add_column :recruitments, :address, :string
    add_column :recruitments, :latitude, :decimal, precision: 10, scale: 6
    add_column :recruitments, :longitude, :decimal, precision: 10, scale: 6
  end
end
