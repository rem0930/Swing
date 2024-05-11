#!/bin/bash
# entrypoint.sh
set -e

# Puma server.pidファイルを削除
rm -f /app/tmp/pids/server.pid

# コマンド実行
exec "$@"