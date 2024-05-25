# frozen_string_literal: true

namespace :recruitments do
  desc "Close expired recruitments"
  task close_expired: :environment do
    Recruitment.where("deadline <= ? AND status = ?", Time.now, Recruitment.statuses[:open]).find_each do |recruitment|
      recruitment.update(status: :closed)
    end
    puts "Closed expired recruitments"
  end
end
