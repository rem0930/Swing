# 使用するNode.jsのバージョンを指定
FROM node:18

# コンテナ内での作業ディレクトリを設定
WORKDIR /usr/src/app

# パッケージファイルをコピー
COPY package.json package-lock.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションがリスニングするポートを宣言
EXPOSE 8000

# アプリケーションの起動コマンド
CMD ["npm", "run", "dev"]