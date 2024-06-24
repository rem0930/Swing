# frozen_string_literal: true

if Rails.env.production?
  Rails.application.config.session_store :cookie_store, key: "_swing_session", same_site: :none, secure: true
else
  Rails.application.config.session_store :cookie_store, key: "_swing_session", same_site: :none, secure: false
end
