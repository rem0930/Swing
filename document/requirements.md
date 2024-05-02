# 要件定義
## 1. アプリケーション概要
**草野球愛好家のためのマッチングプラットフォーム**

## 2. 課題解決
1. **草野球参加の障壁解消:**
    - 草野球に参加するための機会が不足
    - 参加希望者とチームのマッチングが困難
    - 参加したい人が草野球の情報を得る手段が限定的

* 草野球活動の情報があまり公になっておらず、興味を持っている人々が参加の方法を知らない

2. **草野球チームのメンバー不足問題:**
    - 草野球チームが新しいメンバーを募集する手段が限定的
    - チームの要件や活動内容にマッチするメンバーを見つけることが困難
    - チームのメンバー獲得プロセスが非効率的

* メンバーを募集したいが、草野球専用の募集媒体がない
* そもそも募集していることを知られていない 
## 3. なぜそれを解決したいのか
**気軽に趣味を楽しみたい！**

- 草野球愛好者のコミュニティを形成し、草野球参加のハードルを下げる
- 参加希望者とチームをマッチングさせ、草野球の参加を促進
- チーム運営者が効率的にメンバーを募集し、チームの活動を支援するプラットフォームを提供

## 4. 解決手段
地域や興味を共有するユーザー同士をマッチングさせ、草野球チームの募集や参加プロセスを簡略化するマッチングプラットフォームを提供

## 5. 機能要件

### **ユーザー関連**
- ユーザー登録: メールアドレスとパスワード
- ログイン/ログアウト: 登録済みユーザーのみ
- プロフィール作成・編集: プロフィール写真/bio(ポジション/地域/野球経験)
- ソーシャルログイン: Google、X

### **チーム関連**
- チーム作成・編集/要件設定: レベル、スキル、活動頻度、大会履歴など
- チーム募集の状態管理: 募集中、募集終了
- ガチ機能: エンジョイ勢とガチ勢を分ける機能
- イベント企画機能: 試合日程、練習日程など

### **コミュニケーション関連**
- チャット機能: ユーザーはチーム内でチャット機能を利用できる
- 投稿機能：Twitterライクな機能/チームの雰囲気とかわかってもらう
- 通知機能: いいね・募集・チャット通知を受け取る

### **参加者向け機能**
- チーム検索とフィルタリング: 地域や投稿内容
- チーム詳細閲覧: ユーザーはチームの詳細情報を閲覧可能
- チームへの応募
- 応募状況の管理: チーム管理者は応募状況などを管理し、適切な対応ができる
- 参加管理（試合への出欠管理など）: 参加者が試合への出欠管理など行える
- イベント通知機能: 参加者はチームイベント通知を受け取れる

### **その他**
- いいね機能: ユーザーはチームや投稿にいいねできる
- 通知機能: 応募確認、新着チーム情報など
- レビュー・評価機能: チームや参加者の評価 (仮)
- 地図連携: 現在地周辺のチームを探せる・練習場所や試合会場

## 6. 非機能要件
1. **パフォーマンス**
    - サービスの応答時間は最大で2秒以内に保つ
    - ページの読み込み速度は迅速であり、サービスの応答時間が2秒以内に保つ
2. **セキュリティ**
    - ユーザーの個人情報はSSL/TLSで暗号化され、データの機密性を確保
    - パスワードはハッシュ化され、セキュアな形でデータベースに保存(bcrypt)
    - アクセス制御を実装し、権限のないユーザーがシステムにアクセスできないようにする
    - パラメータ化クエリの使用
        -  ユーザーからの入力を直接SQLクエリに挿入せず、パラメータ化クエリを使用してデータベースとのやり取りを行うことで、SQLインジェクション攻撃を防ぐ
    - データベースのエスケープ
        - ユーザーからの入力をデータベースに挿入する際には、エスケープ処理を行い、悪意のあるコードが挿入されるのを防ぐ
3. **保守性**
    - コードは適切にコメントされ、理解しやすく保守性が高いものとする
    - コードベースは適切に分割され、モジュール化されている
    - ソースコードはGithubで管理され、変更履歴が追跡可能
        - GitHubへプッシュ時に Rubocop で自動チェック
4. **運用性**
    - 運用作業は自動化され、CI/CDパイプラインが構築される
        - GitHubのmainブランチにマージしたら自動デプロイ
5. **可用性**
    - サービスは99.9%の稼働時間を保証し、定期メンテナンス時を除いて利用可能
    - (冗長性やフェイルオーバーの実装/バックアップのみ？)
6. **拡張性**
    - システムは将来の拡張に備え、新しい機能やモジュールの追加が容易である
7. **モバイル対応**
    - レスポンシブデザインが採用され、モバイルデバイスからの利用が円滑である