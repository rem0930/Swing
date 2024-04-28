# 設計
## 1. 業務フロー
![image](https://github.com/rem0930/HobbyConnect/assets/83850299/7bae5b8f-79c4-4c71-a1d5-239a5136fb4b)

## テーブル概要
1. users（ユーザー情報）  
id: ユーザーID (主キー, 自動増加)
email: メールアドレス (ユニーク)
password_digest: パスワードのハッシュ値
profile_photo: プロフィール写真のURL
bio: 自己紹介文
created_at: 作成日時
updated_at: 更新日時
2. teams（チーム情報）  
id: チームID (主キー, 自動増加)
name: チーム名
level: レベル（初級、中級、上級）
skills: スキル要件
activity_frequency: 活動頻度
history: 大会履歴
status: 募集状態（募集中、募集終了）
created_at: 作成日時
updated_at: 更新日時
3. team_members（チームメンバー）  
中間テーブルを作成 1対多 
id: ID (主キー, 自動増加)
user_id: ユーザーID (外部キー)
team_id: チームID (外部キー)
role: 役割（キャプテン、メンバー）
joined_at: 参加日
status: 状態（アクティブ、非アクティブ）
4. events（イベント情報）  
id: イベントID (主キー, 自動増加)
team_id: チームID (外部キー)
title: イベントタイトル
description: 説明
event_date: イベント日時
location: 場所
created_at: 作成日時
updated_at: 更新日時
5. posts（投稿情報）  
id: 投稿ID (主キー, 自動増加)
user_id: ユーザーID (外部キー)
content: 内容
created_at: 投稿日時
updated_at: 更新日時
6. likes（いいね情報）  
id: いいねID (主キー, 自動増加)
user_id: ユーザーID (外部キー)
post_id: 投稿ID (外部キー)
created_at: いいねした日時
7. notifications（通知情報）  
id: 通知ID (主キー, 自動増加)
user_id: ユーザーID (外部キー)
message: 通知メッセージ
read: 既読状態（既読、未読）
created_at: 通知日時
