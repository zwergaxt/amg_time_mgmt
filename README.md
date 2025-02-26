## Развертывание решения
Развертывание решения может быть выполнено 2-мя способами:
- через "стандартный" путь с написанием unit'ов Linux
- через Docker
### "Стандартный" путь
Для запуска решения необходимо выполнить последовательность действий:
1. Установить зависимости backend 
```
pip install -r requirements.txt
```
1. Установить зависимости frontend
```
nmp i --legacy-peer-deps
```
1. Запустить backend 
```
python manage.py runserver
```
1. Запустить frontend
```
npm start
```
По-умочанию сервисы доступны на следующих портах:
- backend :8000
- frontend :3000
### Docker-compose
В комплекте поставки решения подготовлены несколько Dockerfile и docker-compose.yml
Предварительно для развертывания системы через Docker требуется установить необходимые пакеты:
- docker
- docker-compose  
В файле docker-compose изменить путь до volume с данными PostgreSQL.  
```
    volumes:
      - "/home/zwergaxt/devel/amg_time_env/docker/data/:/var/lib/postgresql/data"
```
Затем достаточно выполнить:
```
docker compose -f docker-compose.yml up -d --build
```
Docker построит и запустит контейнеры. Сервисы системы будут доступны на тех же портах, что и при "стандартном" развертывании.
