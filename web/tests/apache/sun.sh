#!/usr/bin/env bash
# build/ klasörünü cPanel'e benzer biçimde (Apache, .htaccess açık) yerel bir portta sunar.
# Playwright testleri bunun üstünde koşar; .htaccess kuralları da böylece sınanır.
set -euo pipefail
WEB="$(cd "$(dirname "$0")/../.." && pwd)"
PORT="${PORT:-4174}"
CALISMA="$(mktemp -d)"
trap 'rm -rf "$CALISMA"' EXIT
sed -e "s|@KOK@|$WEB/build|g" -e "s|@PORT@|$PORT|g" -e "s|@CALISMA@|$CALISMA|g" \
	"$WEB/tests/apache/httpd.conf" > "$CALISMA/httpd.conf"
exec httpd -X -f "$CALISMA/httpd.conf"
