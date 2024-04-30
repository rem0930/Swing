# ベースイメージとしてNode.jsの最新LTSバージョンを使用
FROM node:18

# アプリケーションディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとyarn.lockをコピー
COPY package.json yarn.lock ./

# パッケージ依存関係のインストール
RUN yarn install --frozen-lockfile

# アプリケーションのソースコードをコピー
COPY . .

# ビルドする場合（プロダクション用）
# RUN yarn build

# アプリケーションがリッスンするポートを指定
EXPOSE 8000

# アプリケーションの起動コマンド
CMD ["yarn", "dev","--port", "8000"]