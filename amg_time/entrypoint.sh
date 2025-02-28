#!/bin/sh

until cd /usr/src/app/
do
    echo "Waiting for server volume..."
done

python manage.py makemigrations
python manage.py migrate

python manage.py runserver 0.0.0.0:8000