# ユーザーのサンプルデータ
user1 = User.create!(
  email: 'user1@example.com',
  password: 'password123',
  user_name: 'user1'
)

user2 = User.create!(
  email: 'user2@example.com',
  password: 'password123',
  user_name: 'user2'
)

# チームのサンプルデータ
team1 = Team.create!(
  name: 'Tokyo Tigers',
  details: 'A team based in Tokyo.',
  profile_photo: 'path/to/photo1.jpg',
  background_photo: 'path/to/background1.jpg',
  user_id: user1.id
)

team2 = Team.create!(
  name: 'Osaka Owls',
  details: 'A team based in Osaka.',
  profile_photo: 'path/to/photo2.jpg',
  background_photo: 'path/to/background2.jpg',
  user_id: user2.id
)
