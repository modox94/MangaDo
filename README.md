# MangaDo

## Ссылка на сайт проекта: 
#### https://mangado.site/

## Для просмотра сайта можете войти под данным аккаунтом с правами спонсора: 
##### UserName: demo <br/>
##### Password: demo

## Так же для просмотра полного функционала приложения пройдите по ссылке, начало презентации 10 минута ролика: 
#### https://www.youtube.com/watch?v=5hNBXkrXIX0&t=908s

## Список технологий, которые использовались в разработке приложения: 
* NodeJS
* React
* Redux
* React Router
* Websockets
* Image Magick
* Яндекс Диск
* mongoDB
* ExpressJS
* PM2
* NGINX
* JWT tokens
* BCrypt

[Example]: http://example.com/

#### Для запуска проекта необходимо:
1. установить [Node.js](https://nodejs.org/en/download/) (не ниже 14 версии)
2. установить [ImageMagick](https://imagemagick.org/script/download.php)
3. установить [Яндекс.Диск](https://disk.yandex.ru/download)
4. создать онлайн базу данных [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

#### Порядок запуска:
1. открыть в терминале каталог server и набрать команду `npm install`
2. скопировать файл .env.example, переименовать его в .env и дописать отсутствующие (и заменить существующие) поля:
  >> PORT=*порт на котором будет запущен сервер* <br/>
  >> YANDEX_ROOT=*полный путь к целевой папке на яндекс диске* <br/>
  >> DB_NAME=*имя базы данных* <br/>
 - DB_LOGIN=*логин для подключения к онлайн базе данных Atlas*
 - DB_PASS=*пароль для подключения к онлайн базе данных Atlas*
 - jwtToken=*секретная комбинация чисел и букв*
 - jwtRefreshToken=*секретная комбинация чисел и букв*
 - tokenLife=*время жизни обычного токена*
 - refreshTokenLife=*время жизни рефрешь токена*
 - INVITE_ADMIN=*инвайт для регистрации в качестве администратора*
 - INVITE_WORKER=*инвайт для регистрации в качестве рядового работника*
 - INVITE_DON=*инвайт для регистрации в качестве спонсора*
3. набрать в терминале `npm start`
4. открыть новую копию терминала и перейти в папку client и набрать команду `npm install`
5. скопировать файл .env.example, переименовать его в .env и при необходимости заменить существующие поля:
  - REACT_APP_SERVER_PATH=*адрес сервера*
  - REACT_APP_WEBSOCKET_PATH=*адрес сервера вебсокетов*
6. набрать команду `npm start`
