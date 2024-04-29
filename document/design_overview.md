# 設計
## 1. 業務フロー
![image](https://github.com/rem0930/HobbyConnect/assets/83850299/7bae5b8f-79c4-4c71-a1d5-239a5136fb4b)

## テーブル定義書

### 1. users（ユーザーテーブル）

| カラム名          | データ型        | 制約              | 説明                       |
|-------------------|-----------------|-------------------|----------------------------|
| id                | INT             | PRIMARY KEY, AUTO_INCREMENT | ユーザーID                 |
| email             | VARCHAR(255)    | UNIQUE, NOT NULL  | メールアドレス              |
| password_digest   | VARCHAR(255)    | NOT NULL          | パスワードのハッシュ値      |
| profile_photo     | VARCHAR(255)    |                   | プロフィール写真のURL      |
| bio               | VARCHAR(250)    |                   | 自己紹介文                  |
| created_at        | DATETIME        | NOT NULL          | 作成日時                   |
| updated_at        | DATETIME        | NOT NULL          | 更新日時                   |

### 2. teams（チームテーブル）

| カラム名          | データ型        | 制約              | 説明                       |
|-------------------|-----------------|-------------------|----------------------------|
| id                | INT             | PRIMARY KEY, AUTO_INCREMENT | チームID                 |
| name              | VARCHAR(255)    | NOT NULL          | チーム名                   |
| level             | VARCHAR(50)     | NOT NULL          | レベル（初級、中級、上級） |
| skills            | VARCHAR(255)    |                   | スキル要件                 |
| activity_frequency| VARCHAR(255)    |                   | 活動頻度                   |
| history           | VARCHAR(255)    |                   | 大会履歴                   |
| status            | VARCHAR(50)     | NOT NULL          | 募集状態（募集中、募集終了）|
| created_at        | DATETIME        | NOT NULL          | 作成日時                   |
| updated_at        | DATETIME        | NOT NULL          | 更新日時                   |

### 3. team_members（チームメンバーテーブル）

| カラム名          | データ型        | 制約              | 説明                       |
|-------------------|-----------------|-------------------|----------------------------|
| id                | INT             | PRIMARY KEY, AUTO_INCREMENT | ID                       |
| user_id           | INT             | FOREIGN KEY       | ユーザーID                 |
| team_id           | INT             | FOREIGN KEY       | チームID                   |
| role              | VARCHAR(50)     |                   | 役割（キャプテン、メンバー）|
| joined_at         | DATE            |                   | 参加日                     |
| status            | VARCHAR(50)     |                   | 状態（アクティブ、非アクティブ）|
| created_at        | DATETIME        | NOT NULL          | 作成日時                   |
| updated_at        | DATETIME        | NOT NULL          | 更新日時                   |

### 4. events（イベントテーブル）

| カラム名          | データ型        | 制約              | 説明                       |
|-------------------|-----------------|-------------------|----------------------------|
| id                | INT             | PRIMARY KEY, AUTO_INCREMENT | イベントID               |
| team_id           | INT             | FOREIGN KEY       | チームID                   |
| title             | VARCHAR(255)    | NOT NULL          | イベントタイトル           |
| description       | TEXT            |                   | 説明                       |
| event_date        | DATETIME        | NOT NULL          | イベント日時               |
| location          | VARCHAR(255)    |                   | 場所                       |
| created_at        | DATETIME        | NOT NULL          | 作成日時                   |
| updated_at        | DATETIME        | NOT NULL          | 更新日時                   |

### 5. posts（投稿テーブル）

| カラム名          | データ型        | 制約              | 説明                       |
|-------------------|-----------------|-------------------|----------------------------|
| id                | INT             | PRIMARY KEY, AUTO_INCREMENT | 投稿ID                   |
| user_id           | INT             | FOREIGN KEY       | ユーザーID                 |
| content           | TEXT            | NOT NULL          | 内容                       |
| created_at        | DATETIME        | NOT NULL          | 投稿日時                   |
| updated_at        | DATETIME        | NOT NULL          | 更新日時                   |

### 6. likes（いいねテーブル）

| カラム名          | データ型        | 制約              | 説明                       |
|-------------------|-----------------|-------------------|----------------------------|
| id                | INT             | PRIMARY KEY, AUTO_INCREMENT | いいねID                 |
| user_id           | INT             | FOREIGN KEY       | ユーザーID                 |
| post_id           | INT             | FOREIGN KEY       | 投稿ID                     |
| created_at        | DATETIME        | NOT NULL          | いいねした日時             |

### 7. notifications（通知テーブル）

| カラム名          | データ型        | 制約              | 説明                       |
|-------------------|-----------------|-------------------|----------------------------|
| id                | INT             | PRIMARY KEY, AUTO_INCREMENT | 通知ID                   |
| user_id           | INT             | FOREIGN KEY       | ユーザーID                 |
| message           | VARCHAR(255)    | NOT NULL          | 通知メッセージ             |
| read              | BOOLEAN         | NOT NULL          | 既読状態（既読、未読）     |
| created_at        | DATETIME        | NOT NULL          | 通知日時                   |

