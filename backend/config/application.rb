# frozen_string_literal: true

require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # デフォルトのロケールを日本語に設定
    config.i18n.default_locale = :ja

    # ロケールファイルのパスを追加
    config.i18n.load_path += Dir[Rails.root.join("config", "locales", "**", "*.{rb,yml}").to_s]

    config.autoload_lib(ignore: %w[assets tasks])

    config.api_only = true

    config.autoload_paths += %W(#{config.root}/app/uploaders)

    config.hosts << "https://swi-ng.com/"
  end
end
