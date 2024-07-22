# frozen_string_literal: true

class Conversation < ApplicationRecord
  belongs_to :recruitment
  has_many :messages
  has_many :applications, through: :recruitment

  def participants(current_user)
    if recruitment.user == current_user
      applications.map(&:user)
    else
      [recruitment.user]
    end
  end
end
