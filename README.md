# Задание: Создать простое webApp.

Создать простое webApp, используя Node.js (Express, JavaScript), PostgresQL (Sequelize ORM).

При запуске приложение должно создать в базе данных таблицу “users” с помощью миграции и добавить в неё один пользовательский аккаунт, 
на котором будет лишь одно поле “balance” со значением 10000. 

Для совершения миграций, управляемых приложением, можно использовать библиотеку “Umzug”.

Написать route для обновления баланса пользователя, как в большую, так и в меньшую сторону, принимающего параметры userId и amount.

Важным условием является то, что баланс пользователя не может быть отрицательным.

Изменение баланса должно производиться в реальном времени, без использования очередей и отложенных задач.

# Запуск

1. установить docker
2. docker compose up

# Пример тестового запроса
```
POST http://localhost:3000/change-many HTTP/1.1
Content-Type: application/json

{
  "userId": "7e45261b-41a5-4919-b688-b10e2500f516",
  "amount": -2
}
```
