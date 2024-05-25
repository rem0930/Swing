FROM ruby:3.2

# 必要なディレクトリを作成
RUN mkdir /app
WORKDIR /app

# 必要なライブラリをインストール
RUN apt-get update -qq && apt-get install -y default-mysql-client cron

# GemfileとGemfile.lockをコピーして、バンドルインストールを実行
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN gem update && bundle install

# アプリケーションのソースコードをコピー
ADD . /app

# wheneverの設定を行う
RUN bundle exec whenever --update-crontab

# 古いPIDファイルを削除する
RUN rm -f tmp/pids/server.pid

# エントリーポイントスクリプトの設定
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["/usr/bin/entrypoint.sh"]

# CRONを起動し、Railsサーバーも起動
CMD ["bash", "-c", "cron && rails server -b 0.0.0.0 -p 3000"]