#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/physlabs.org"
REPO_URL="git@github.com:MuradAYaghi/physlabs.org.git"
APP_USER="muradayaghi"
APP_GROUP="www-data"
SITE_NAME="physlabs.org"
NGINX_AVAILABLE="/etc/nginx/sites-available/${SITE_NAME}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${SITE_NAME}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script with sudo: sudo bash deploy/server-setup.sh" >&2
  exit 1
fi

install -d -m 2755 -o "${APP_USER}" -g "${APP_GROUP}" "${APP_DIR}"

if [[ -d "${APP_DIR}/.git" ]]; then
  sudo -H -u "${APP_USER}" git -C "${APP_DIR}" pull --ff-only
else
  sudo -H -u "${APP_USER}" git clone "${REPO_URL}" "${APP_DIR}"
fi

install -m 0644 "${APP_DIR}/deploy/nginx-physlabs.conf" "${NGINX_AVAILABLE}"
ln -sfn "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"

nginx -t
systemctl reload nginx

echo "PhysLabs deployed from ${APP_DIR}."
