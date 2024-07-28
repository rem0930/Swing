# frozen_string_literal: true

set :output, "log/cron_log.log"

every 1.hour do
  rake "recruitments:close_expired"
end

every 1.hour do
  runner "Recruitment.update_expired_recruitments"
end

every 1.day, at: '12:00 am' do
  runner "Recruitment.cleanup_old_posts"
end
