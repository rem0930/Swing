class Location < ApplicationRecord
    # 1つのロケーションには複数のユーザーが存在する
    has_many :users
end