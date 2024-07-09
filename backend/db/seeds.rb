# frozen_string_literal: true

# サンプルユーザーデータ
user1 = User.create!(
  email: "user1@example.com",
  password: "password123",
  user_name: "user1"
)

user2 = User.create!(
  email: "user2@example.com",
  password: "password123",
  user_name: "user2"
)

User.create!(
  email: "user3@example.com",
  password: "password123",
  user_name: "user3"
)

# サンプルチームデータ
team1 = Team.create!(
  name: "Tokyo Tigers",
  details: "東京を拠点とするチームです。",
  user_id: user1.id
)

team2 = Team.create!(
  name: "Shibuya Owls",
  details: "渋谷を拠点とするチームです。",
  user_id: user2.id
)

# サンプルリクルートメントデータ
Recruitment.create!([
  {
    title: "夏のトーナメント - メンバー募集",
    description: "夏のトーナメントに向けて新しいメンバーを募集しています。初心者歓迎、経験者優遇！一緒に楽しく練習しましょう。",
    address: "東京都渋谷区",
    latitude: 35.6895,
    longitude: 139.6917,
    event_date: DateTime.now + 30.days,
    deadline: DateTime.now + 25.days,
    status: 0,
    role: :member,
    team_id: team1.id
  },
  {
    title: "フレンドリーマッチ - 対戦相手募集",
    description: "フレンドリーマッチを開催予定です。対戦相手を募集しています。気軽にご参加ください！",
    address: "東京都新宿区",
    latitude: 35.6938,
    longitude: 139.7034,
    event_date: DateTime.now + 20.days,
    deadline: DateTime.now + 15.days,
    status: 0,
    role: :opponent,
    team_id: team2.id
  },
  {
    title: "7/19 - 助っ人募集",
    description: "週末の練習を手伝ってくれるヘルパーを募集しています。経験は問いません。楽しくサポートしてください。",
    address: "東京都渋谷区宇田川町",
    latitude: 35.6580,
    longitude: 139.7017,
    event_date: DateTime.now + 10.days,
    deadline: DateTime.now + 5.days,
    status: 0,
    role: :helper,
    team_id: team1.id
  },
  {
    title: "秋のリーグ戦 - メンバー募集",
    description: "秋のリーグ戦に参加するためのメンバーを募集しています。経験者大歓迎、一緒に優勝を目指しましょう！",
    address: "東京都港区",
    latitude: 35.6895,
    longitude: 139.6917,
    event_date: DateTime.now + 40.days,
    deadline: DateTime.now + 35.days,
    status: 0,
    role: :member,
    team_id: team2.id
  },
  {
    title: "春のフレンドリー - 対戦相手募集",
    description: "春のフレンドリーマッチの対戦相手を募集しています。楽しくプレーしましょう！",
    address: "東京都千代田区",
    latitude: 35.6938,
    longitude: 139.7034,
    event_date: DateTime.now + 50.days,
    deadline: DateTime.now + 45.days,
    status: 0,
    role: :opponent,
    team_id: team1.id
  }
])
