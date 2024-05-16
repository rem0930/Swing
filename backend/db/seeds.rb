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

user3 = User.create!(
  email: "user3@example.com",
  password: "password123",
  user_name: "user3"
)

# サンプルチームデータ
team1 = Team.create!(
  name: "Tokyo Tigers",
  details: "A team based in Tokyo.",
  user_id: user1.id
)

team2 = Team.create!(
  name: "Shibuya Owls",
  details: "A team based in Osaka.",
  user_id: user2.id
)

# サンプルロケーションデータ
location1 = Location.create!(
  name: "Tokyo",
  latitude: 35.6895,
  longitude: 139.6917,
  address: "Tokyo, Japan"
)

location2 = Location.create!(
  name: "Shinjuku",
  latitude: 35.6938,
  longitude: 139.7034,
  address: "Shinjuku, Tokyo, Japan"
)

location3 = Location.create!(
  name: "Shibuya",
  latitude: 35.6580,
  longitude: 139.7017,
  address: "Shibuya, Tokyo, Japan"
)

# サンプルリクルートメントデータ
Recruitment.create!([
  {
    title: 'Summer Tournament - Need Members',
    description: 'We are looking for new members to join our team for the summer tournament.',
    location_id: location1.id,
    event_date: DateTime.now + 30.days,
    deadline: DateTime.now + 25.days,
    status: 0,
    role: :member,
    team_id: team1.id
  },
  {
    title: 'Friendly Match - Seeking Opponents',
    description: 'We are organizing a friendly match and are seeking opponents.',
    location_id: location2.id,
    event_date: DateTime.now + 20.days,
    deadline: DateTime.now + 15.days,
    status: 0,
    role: :opponent,
    team_id: team2.id
  },
  {
    title: 'Helper Needed for Weekend Practice',
    description: 'We need a helper to assist with our weekend practice sessions.',
    location_id: location3.id,
    event_date: DateTime.now + 10.days,
    deadline: DateTime.now + 5.days,
    status: 0,
    role: :helper,
    team_id: team1.id
  },
  {
    title: 'Fall League - Recruiting Members',
    description: 'Join our team for the upcoming fall league!',
    location_id: location1.id,
    event_date: DateTime.now + 40.days,
    deadline: DateTime.now + 35.days,
    status: 0,
    role: :member,
    team_id: team2.id
  },
  {
    title: 'Spring Friendly - Need Opponents',
    description: 'We are looking for opponents for a friendly match this spring.',
    location_id: location2.id,
    event_date: DateTime.now + 50.days,
    deadline: DateTime.now + 45.days,
    status: 0,
    role: :opponent,
    team_id: team1.id
  }
])
