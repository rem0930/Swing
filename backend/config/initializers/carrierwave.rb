require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.production?
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region:                ENV['AWS_REGION']
    }
    config.fog_directory  = ENV['AWS_BUCKET'] # 本番用バケット
    config.fog_public     = false # バケットのパブリックアクセスを無効にする
    config.storage        = :fog
  elsif Rails.env.development?
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region:                ENV['AWS_REGION']
    }
    config.fog_directory  = ENV['AWS_DEV_BUCKET'] # 開発用バケット
    config.fog_public     = false # バケットのパブリックアクセスを無効にする
    config.storage        = :fog
  else
    config.storage = :file
    config.enable_processing = Rails.env.test?
  end
end
