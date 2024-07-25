# frozen_string_literal: true

set :output, "log/cron_log.log"

every 1.hour do
  rake "recruitments:close_expired"
end

every 1.hour do
  runner "Recruitment.update_expired_recruitments"
end