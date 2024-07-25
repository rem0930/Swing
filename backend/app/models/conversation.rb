# frozen_string_literal: true

class Conversation < ApplicationRecord
  belongs_to :recruitment
  has_many :messages
  has_many :applications, through: :recruitment
  has_and_belongs_to_many :users  # 追加：ユーザーと多対多の関連を定義

  def participants(current_user)
    if recruitment.team.user == current_user
      applications.map(&:user)
    else
      [recruitment.team.user]
    end
  end
end
