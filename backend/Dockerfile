FROM ruby:3.2

ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo

WORKDIR /app

# 必要なパッケージのインストール
RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client redis-tools && apt-get clean && rm -rf /var/lib/apt/lists/*

# アプリケーションのファイルをコピー
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

# Bundler を使って Gem をインストール
RUN bundle install

# アプリケーションのソースをコンテナにコピー
COPY . /app

# ポート3000を開放
EXPOSE 3000

# Railsサーバーの起動
CMD ["rails", "server", "-b", "0.0.0.0"]