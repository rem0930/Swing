# frozen_string_literal: true

class RenameTypeInRecruitments < ActiveRecord::Migration[7.1]
  def change
    rename_column :recruitments, :type, :role
  end
end
