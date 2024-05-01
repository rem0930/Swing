# Swing

## 概要
このプロジェクトは、「」

## 開始手順

1. プロジェクトのディレクトリに移動します。

    ```bash
    cd your-project-directory
    ```

2. Dockerイメージをビルドします。

    ```bash
    docker-compose build
    ```

3. Dockerコンテナを起動します。

    ```bash
    docker-compose up -d
    ```

4. データベースのセットアップを行います。

    ```bash
    docker-compose run --rm backend bundle exec rails db:create db:migrate
    ```

5. 開発中のコンテナを利用します。ソースコードの変更を行うと、自動でリロードされます。

6. テストを実行します。

    ```bash
    docker-compose run --rm backend bundle exec rspec
    ```

7. 開発が完了したら、コンテナを停止し、クリーンアップします。

    ```bash
    docker-compose down
    ```

## 注意事項

- 不要なイメージやボリューム、ネットワークを削除するには、適宜 docker system prune や docker volume prune などのコマンドを使用します。
-
