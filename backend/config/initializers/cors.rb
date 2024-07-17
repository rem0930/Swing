# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://swi-ng.com", "http://localhost:8000", "http://localhost:4000"
    resource "*",
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head],
             expose: ["Authorization"] # JWTトークンを返す場合に必要
  end
end
