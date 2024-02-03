<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Скачай город!</title>
    <link rel="stylesheet" href="style.css">
    <script src="scripts/carousel.js" defer></script>
    <script src="scripts/add_fav.js" defer></script>
    <script src="scripts/search_post.js" defer></script>
</head>
<body>
    <header>
        <div class="header__top">
            <div class="container">
                <a href="index.php" class="logo">   
                    <img src="img/logo.png" alt="">
                </a>
                <a href="catalog.php" class="header__catalog">
                    Каталог
                </a>
                <a href="profile.php" class="header__profile">
                    Профиль
                </a>
            </div>
        </div>
        <div class="header__bottom">
            <div class="container">
                <nav>
                    <ul>
                        <a href="company.php"><li>О компании</li></a>
                        <li class="header__search"><input placeholder="Поиск по каталогу" class="header__search__input" type="text"><button id="search__button"></button></li>
                        <a href="contacts.php"><li>Контакты</li></a>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <main>
        <div class="container">
            <section class="contacts">
                <h2>Контакты</h2>
                <div class="contacts__wrapper">
                    <div class="contacts__item">
                        <img src="img/кирилл синус.jpg" alt="">
                        <div class="contact__name">
                            Кирилл синус
                        </div>
                        <div class="contact__post">
                            Разработчик
                        </div>
                    </div>
                    <div class="contacts__item">
                        <img src="img/нася куропанк.jpg" alt="">
                        <div class="contact__name">
                            Нася kuropunk
                        </div>
                        <div class="contact__post">
                            Владелец
                        </div>
                    </div>
                    <div class="contacts__item">
                        <img src="img/nabl.jpg" alt="">
                        <div class="contact__name">
                            леха
                        </div>
                        <div class="contact__post">
                            Гавна лепеха
                        </div>
                    </div>
                </div>
                <h2>Для связи</h2>
                <div class="contact__info">
                    <div class="contact__info__top">
                        <div class="contact__info__item">
                            Почта: example.gmail.com
                        </div>
                        <div class="contact__info__item">
                            Телефон: +7 (924) 123 45-67
                        </div>
                    </div>
                    <div class="contact__info__item">
                        Telegram: @prikol_anekdot
                    </div>
                </div>
                <div class="map">
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aef24bff3a880d9df16f2960acb0df87659c015370a75435eb0a07f6b1a5efe32&amp;source=constructor" width="727" height="384" frameborder="0"></iframe>
                </div>
            </section>
        </div>
    </main>
    <?php
$user = 'sql12672654'; // ваш пользователь
$password = ''; // ваш пароль
$db = 'mydb'; // имя вашей базы данных 
$host = 'localhost'; // локальный хост
$charset = 'utf8'; // нужная кодировка
// А теперь подключаемся
$pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $password);
// Обращаемся к таблице users
$query = $pdo -> query('SELECT * FROM users');
// Перебираем массив
while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
echo $row['login']."";
}

    ?>
    <footer>
        <div class="container">
есаул конь еблан
        <p id="credits">Сайт разрабатывал кирилл синус</p>
        </div>
    </footer>
</body>
</html>