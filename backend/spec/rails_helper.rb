# frozen_string_literal: true

# This file is copied to spec/ when you run 'rails generate rspec:install'
require "spec_helper"
ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"

require 'capybara/rails'
require 'capybara/rspec'
# require 'selenium-webdriver'
# Capybara.server = :puma, { Silent: true } # テストサーバーとしてPumaを使用

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end
RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_paths = [
    Rails.root.join("spec/fixtures")
  ]

  config.color = true
  config.tty = true
  config.formatter = :documentation

  # FactoryBotのメソッドを直接使用するための設定
  config.include FactoryBot::Syntax::Methods

  config.use_transactional_fixtures = true

  # The different available types are documented in the features, such as in
  # https://rspec.info/features/6-0/rspec-rails
  config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!

  # JSONレスポンスをパースするヘルパーメソッドを追加
  config.include(Module.new do
    def json
      JSON.parse(response.body)
    end
  end)
end