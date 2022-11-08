## GoIT Node.js Course Homework

### Dependencies:

---

| bcryptjs | cors | cross-env | dotenv | express | gravatar | jimp | joi | jsonwebtoken | mongoose | morgan | multer | @sendgrid/mail |
| -------- | ---- | --------- | ------ | ------- | -------- | ---- | --- | ------------ | -------- | ------ | ------ | -------------- |

---

### Branches:

---

- 'main' -- it contains last version of app;
-

### API:

---

**Use api on routes:**

- /
- /register
- /login
- /news
- /friends
- /notices/:categoryName
- /user

some action with data:

| route | method mongoose |
| ----- | :-------------: |
| /news |        {        |

    "message": "success",
    "data": {
        "result": [
            {
                "_id": "636a5bc86986a59ed91c10f2",
                "title": "Обережно, кліщі! Як уберегти улюбленця від неприємностей?",
                "description": "Травневі прогулянки з улюбленцем не лише приємні, але й потребують пильності. З початком теплої пори року активізуються кліщі, і треба бути уважним, щоб уберегти свого песика чи котика від дуже серйозних неприємностей зі здоров`ям.",
                "date": "10/11/2022",
                "link": "https://www.kmlvm.com.ua/oberezhno-klishhi-yak-uberegty-ulyublentsya-vid-nepryyemnostej/"
            },  }     |

| /friends | {[
{
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
}} |

| /user | {[
{
"name": "Ann",
"email": "barbos@gmail.com",
"password": "fgkjnm",
"birthday": "22.11.2222",
"city": "Akhtyrka, Sumy",
"phone": "+380671234567",
"avatar": "https://s.0312.ua/section/newsInText/upload/images/news/intext/000/050/183/barbos-logo_5c078b136ea2f.jpg"
}]} |

|pets|{[
{
"name": "Jack",
"birthday": "22.11.2222",
"comments": "Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor s",
"breed": "Pomeranian",
"owner": "",
"avatar": "https://s.0312.ua/section/newsInText/upload/images/news/intext/000/050/183/barbos-logo_5c078b136ea2f.jpg"
}]} |
