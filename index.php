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
            <section class="collections">
                <h2>Подборки</h2>
                <div class="collections__wrapper">
                    <div class="collections__carousel">
                        <div class="carousel__images">
                            <a href=""><img src="img/1.png" alt=""></a>
                            <a href=""><img src="img/2.png" alt=""></a>
                            <a href=""><img src="img/3.png" alt=""></a>
                            <a href=""><img src="img/4.png" alt=""></a>

                        </div>
                        <div id="carousel__left"></div>
                        <div id="carousel__right"></div>
                    </div>
                    <div class="collections__recommended">
                        <a class="recommended__item">
                            <div class="recommended__item__left">
                                <h3>Романы</h3>
                                <p>Подборка популярных и не очень историй, специально от нашей редакции</p>
                            </div>
                            <img src="img/novel.png" alt="">
                        </a>
                        <a class="recommended__item">
                            <div class="recommended__item__left">
                                <h3>3 больших книги на зиму</h3>
                                <p>Хватит на три месяца</p>
                            </div>
                            <img src="img/winter.png" alt="">
                        </a>
                        <a class="recommended__item">
                            <div class="recommended__item__left">
                                <h3>Умные книги</h3>
                                <p>От Юкио Мисимы до Шамиля Идиатуллина</p>
                            </div>
                            <img src="img/brain.png" alt="">
                        </a>
                        <a class="recommended__item">
                            <div class="recommended__item__left">
                                <h3>Тёмное фэнтези</h3>
                                <p>«Зов Ктулху», «Книга ночи» и другие книги</p>
                            </div>
                            <img src="img/cthulhu.png" alt="">
                        </a>
                    </div>
                </div>
            </section>
            <section class="new">
                <h2>Книжные новинки</h2>
                <div class="new__wrapper">
                    <div class="bookCover">
                        <div class="book__cover"><a href=""><img src="img/mozg.jpg" alt=""></a><div class="book__mark"></div></div>
                        <a href="" class="book__name">Энергия мозга. Теория развития всех психических заболеваний, объясняющая их общую причину</a>
                        <p class="book__author">Кристофер М. Палмер</p>
                        <a href="" class="book__download">Скачать</a>
                    </div>
                    <div class="bookCover">
                        <div class="book__cover"><a href=""><img src="img/sneg.jpg" alt=""></a><div class="book__mark"></div></div>
                        <a href="" class="book__name">Снегурочка: о мимолетности жизни</a>
                        <p class="book__author">Александр Островский</p>
                        <a href="" class="book__download">Скачать</a>
                    </div>
                    <div class="bookCover">
                        <div class="book__cover"><a href=""><img src="img/gemm.jpg" alt=""></a><div class="book__mark"></div></div>
                        <a href="" class="book__name">Геммы. Сыскное управление</a>
                        <p class="book__author">Анна Коэн, Марк Коэн</p>
                        <a href="" class="book__download">Скачать</a>
                    </div>
                    <div class="bookCover">
                        <div class="book__cover"><a href=""><img src="img/star.jpg" alt=""></a><div class="book__mark"></div></div>
                        <a href="" class="book__name">Старшая по подъезду</a>
                        <p class="book__author">Александр Бессонов</p>
                        <a href="" class="book__download">Скачать</a>
                    </div>
                    <div class="bookCover">
                        <div class="book__cover"><a href=""><img src="img/nabl.jpg" alt=""></a><div class="book__mark"></div></div>
                        <a href="" class="book__name">Наблюдатель</a>
                        <p class="book__author">Шарлотта Линк</p>
                        <a href="" class="book__download">Скачать</a>
                    </div>
                    <div class="bookCover">
                        <div class="book__cover"><a href=""><img src="img/toch.jpg" alt=""></a><div class="book__mark"></div></div>
                        <a href="" class="book__name">Точное будущее. Лучшая фантастика — 2024</a>
                        <p class="book__author">Сергей Лукьяненко, Вадим Панов</p>
                        <a href="" class="book__download">Скачать</a>
                    </div>
                    <div class="bookCover">
                        <div class="book__cover"><a href=""><img src="img/poim.jpg" alt=""></a><div class="book__mark"></div></div>
                        <a href="" class="book__name">Поймать океан</a>
                        <p class="book__author">Виктория Войцек</p>
                        <a href="" class="book__download">Скачать</a>
                    </div>
                    <div class="bookCover">
                        <div class="book__cover"><a href=""><img src="img/snad.jpg" alt=""></a><div class="book__mark"></div></div>
                        <a href="" class="book__name">С надеждой на смерть</a>
                        <p class="book__author">Кара Хантер</p>
                        <a href="" class="book__download">Скачать</a>
                    </div>
                    
                </div>
                
            </section>
        </div>
    </main>
    <footer>
        <div class="container">
            <p id="credits">Сайт разрабатывал кирилл синус</p>
        </div>
    </footer>
</body>
</html>