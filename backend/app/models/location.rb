# frozen_string_literal: true

class Location < ApplicationRecord
  # 1つのロケーションには複数のユーザーが存在する
  has_many :users
end
