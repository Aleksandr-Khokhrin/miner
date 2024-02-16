# ---"Сапёр"---

![image](https://github.com/Aleksandr-Khokhrin/miner/assets/147053338/e27c0176-364b-4eb6-9d62-614daa77ea5f)

Ссылка на игру: https://aleksandr-khokhrin.github.io/miner/

Краткое описание: Классическая игра "Сапёр". Написан мною только frontend. Это один из первых моих проектов. 

Функционал:
1. Регистрационное окно, в которое вводится userName и пользователь автоматически либо регистрируется, либо авторизируется.

![image](https://github.com/Aleksandr-Khokhrin/miner/assets/147053338/3171b37c-526b-4797-ad16-ad79b18e529b)

2. После старта игры с сервера приходит информация по содержимому каждой клетки и мы рендерим наше поле ячеек:

![image](https://github.com/Aleksandr-Khokhrin/miner/assets/147053338/cfa20998-1735-44cb-bdb8-9dfa0a5b26e1)

3. После каждого клика по ячейке мы проверяем правильность сделанного шага. Если шаг успешен и есть еще клетки нераскрытые для пользователя, то игра продолжается:

![image](https://github.com/Aleksandr-Khokhrin/miner/assets/147053338/cfce9ade-e3e7-466c-9e7d-4ac85e28faf0)

4. Если сапёр напоролся на бомбу, то игра заканчивается и с сервера приходит полная сетка всех клеток со значениями:

![image](https://github.com/Aleksandr-Khokhrin/miner/assets/147053338/fc405d26-701e-4b97-a1a0-82d3358da656)

5. После окончания игры у пользователя, в верхней части экрана, меняется колличество очков, в зависимости от того, выиграл он или проиграл:

![image](https://github.com/Aleksandr-Khokhrin/miner/assets/147053338/ae32d32c-b98c-4b12-8dee-2e39066e25eb)

Инструментарий:
1. HTML
2. CSS
3. JS

Вывод: Довольно лёгкое приложение с простой реализацией логики для игры в Сапёра. Это одно из моих приложений. Сейчас я понимаю, что код можно переписать, использовав CSS и адаптировав JS код, убрав из него повторяющиеся компоненты.

![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_react-front/assets/147053338/d1421d97-c486-45f4-b34f-5faede758ca4)



