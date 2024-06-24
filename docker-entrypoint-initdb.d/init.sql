CREATE DATABASE IF NOT EXISTS swing_dev;

-- ユーザーが存在しない場合のみ作成
SET @existing_user = (SELECT COUNT(*) FROM mysql.user WHERE user = 'rem0930_dev');
IF @existing_user = 0 THEN
    CREATE USER 'rem0930_dev'@'%' IDENTIFIED BY 'password';
END IF;

GRANT ALL PRIVILEGES ON swing_dev.* TO 'rem0930_dev'@'%';
FLUSH PRIVILEGES;
