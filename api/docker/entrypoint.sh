#!/bin/bash

DB_FILE="/var/www/database/database.sqlite"

if [ ! -f "$DB_FILE" ]; then
  mkdir -p "$(dirname "$DB_FILE")"
  touch "$DB_FILE"
  echo "Database file created at $DB_FILE"
fi

composer install
php artisan migrate
php artisan cache:clear
chmod -R 777 ./storage
chmod -R 777 ./bootstrap/cache
php artisan key:generate
php-fpm
