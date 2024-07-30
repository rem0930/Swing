# frozen_string_literal: true

namespace :recruitments do
  desc "Close expired recruitments"
  task close_expired: :environment do
    Recruitment.update_expired_recruitments
    puts "Closed expired recruitments"
  end

  desc "Cleanup old recruitments"
  task cleanup_old_posts: :environment do
    Recruitment.cleanup_old_posts
    puts "Cleaned up old recruitments"
  end
end
