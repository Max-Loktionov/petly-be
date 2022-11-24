## GoIT Node.js Course Homework

### Dependencies:

---

| bcryptjs | cors | cross-env | dotenv | express | jimp | joi | jsonwebtoken | mongoose | http-errors |
| -------- | ---- | --------- | ------ | ------- | ---- | --- | ------------ | -------- | ----------- |

---

### Branches:

---

- 'dev' -- it contains last version of app;
- 'main' -- deploy to heroku
-

### API:

---

**Use api on routes:**

--https://petly-be.herokuapp.com

```

POST /auth/signup - реєстрація користувача (потребує  password, email, name - обов'язкові, city, phone, birthday)
POST /auth/login - логінізація користувача (потребує email, password)
GET /auth/logout - логаут
GET /auth/current - віддає данні користувача при вже наявному токені

/======== Данні про юзера ================/
GET /user - віддає данні про користувача, включно з домашніми улюбленцями, при наявності токену;
GET /user/notice - віддає оголошення створені користувачем
PATCH /user/avatar - оновлення аватара юзера, наявність токену);
PATCH /user/:properties - оновлює одне поле з інформацією про юзера(одне з name, email, birthday, city, phone), окрім аватара,
      properties - поле яке треба оновити, потребує передачу даних для оновлення

/======== Данні про цуцика юзера =======/

POST /user/pets - додає юзеру домашнього улюбленця, наявніcть токену (потребує name - обов'язково, birthday, breed, comments));
DELETE /user/pets/:petsId - видляє домашнього улюбленця по його id, наявність токену;

/========  Дані по друзях ===============/

 GET /friends  -   всі дані з друзями /доступна пагінація (default {page = 1, limit = 10})

/========  Дані по новинах ===============/

GET  /news -     get - всі дані з новинами /доступна пагінація (default {page = 1, limit = 10})

/====== Робота з оголошеннями=======/

GET /notices - всі оголошення / доступна пагінація (default (page = 1, per_page = 15))/
    (обрати за категорією з доступних: ["sell", "lost_found", "in_good_hands"], за допомогою req.query (params at the postman SET))
GET /notices/:id  - детальна інформація по оголошенню(потребує id оголошення)
POST /notices  -  додавання оголошення (потребує name,title,birthday,breed,male,location,comments - обов'язково, price, avatar, category ),
       потребує передачу даних за допомогою body/form-data/text (key=name,key=title, ...); body/form-data/file key=avatar; query (notices?category=in_good_hands)
DELETE /notices/:id - видалення оголошення за його id

/======== Робота з favorite оголошеннями =======|
GET /user/favorite - віддає улюблені оголошення користувача
DELETE /user/favorite - видаляє оголошення з улюблених у користувача (потребує notice_id оголошення в query)
      (приклад // url/user/favorite?notice_id=6372bb9b6b1a551c201218ef)
POST /user/favorite - додає оголошення до улюблених (потребує notice_id оголошення в query)


```

- if you need pagination News, you have to add two parameters (page={Number}&limit={Number}) (number of page wich could be choosen with amount=limit
  contacts on each pages), limit=Number [by default (GET news/?page=1&limit=10)]

- /friends

- if you need pagination Friends, you have to add two parameters (page={Number}&limit={Number}) (number of page wich could be choosen with
  amount=limit contacts on each pages), limit=Number [by default (GET friends/?page=1&limit=10)]

- /notices/:categoryName
- /user

some action with data:

| route | schema |
| ----- | :----: |
| /news |   {    |

````"message": "success",
 "data": {
     "result": [
         {
             "_id": "636a5bc86986a59ed91c10f2",
             "title": "Обережно, кліщі! Як уберегти улюбленця від неприємностей?",
             "description": "Травневі прогулянки з улюбленцем не лише приємні, але й потребують пильності. З початком теплої пори року активізуються кліщі, і треба бути уважним, щоб уберегти свого песика чи котика від дуже серйозних неприємностей зі здоров`ям.",
             "date": "10/11/2022",
             "link": "https://www.kmlvm.com.ua/oberezhno-klishhi-yak-uberegty-ulyublentsya-vid-nepryyemnostej/"
         },  }    ``` |

| /friends | ```

[{
"name": "Барбос",
"time": {
"MN": "8:00- 20:00",
"TU": "8:00- 20:00",
"WE": "8:00- 20:00",
"TH": "8:00- 20:00",
"FR": "8:00- 20:00",
"SA": "8:00- 20:00",
"SU": "8:00- 20:00"
},
"adress": "Grigorenka Street, 25 ",
"phone": "+3110 44 290-03-29",
"email": "barbos@gmail.com",
"logo": "https://s.0312.ua/section/newsInText/upload/images/news/intext/000/050/1113/barbos-logo_5c0711b136ea2f.jpg",
"link": "https://www.facebook.com/NGO.Barbos"
}}]

``` |

| /user | ```
{[
  {
"name": "Ann",
"email": "barbos@gmail.com",
"password": "fgkjnm",
"birthday": "22.11.2222",
"city": "Akhtyrka, Sumy",
"phone": "+380671234567",
"avatar": "https://s.0312.ua/section/newsInText/upload/images/news/intext/000/050/183/barbos-logo_5c078b136ea2f.jpg"
}]}
``` |

|pets| ```
{[
  {
  "name": "Jack",
  "birthday": "22.11.2222",
  "comments": "Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor s",
  "breed": "Pomeranian",
  "owner": "",
  "avatar": "https://s.0312.ua/section/newsInText/upload/images/news/intext/000/050/183/barbos-logo_5c078b136ea2f.jpg"
  }]
  }
  ``` |
````
