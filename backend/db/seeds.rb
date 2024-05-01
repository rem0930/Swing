# db/seeds.rb
User.create!(
    email: 'user@example.com',
    password_digest: BCrypt::Password.create('password'),
    user_name: 'Demo User',
    bio: 'This is a demo user.'
)