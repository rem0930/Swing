# frozen_string_literal: true

Doorkeeper.configure do
  # Change the ORM that doorkeeper will use (requires ORM extensions installed).
  # Check the list of supported ORMs here: https://github.com/doorkeeper-gem/doorkeeper#orms
  orm :active_record

  # 管理者認証の設定
  admin_authenticator do |routes|
    user = ApplicationController.new.current_user
    # ユーザーが管理者でない場合はアクセスを拒否
    unless user&.admin?
      # ユーザーをログインページにリダイレクト
      routes.redirect_to(new_user_session_url, alert: 'Access Denied: You are not authorized to access the admin panel.')
    end
  end
end
