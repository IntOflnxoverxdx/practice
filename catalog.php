<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Скачай город!</title>
    <link rel="stylesheet" href="style.css">
    <script src="scripts/search_post.js" defer></script>
    <script src="scripts/search.js" defer></script>
    <script src="scripts/filters.js" defer></script>
    <script src="scripts/add_fav.js" defer></script>
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
                        <li class="header__search"><input id="search" placeholder="Поиск по каталогу" class="header__search__input" type="text"><button id="search__button"></button></li>
                        <a href="contacts.php"><li>Контакты</li></a>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <main>
        <div class="container">
            <section class="catalog">
                <h2>Каталог</h2>
                <div class="catalog__wrapper">
                    <div class="catalog__sort">
                        <h4>Фильтры</h4>
                        <p class="sort__label">Сортировать по:</p>
                        <div class="sort__select__wrapper">
                            <select name="sort_by" id="sort__select">
                                <option value="name">Названию</option>
                                <option value="author">Автору</option>
                            </select>
                        </div>
                        <p class="sort__label">Искать в названии</p>
                        <input id="search__inname" type="text" placeholder="Введите часть названия">
                        <button id="sort__apply">ПРИМЕНИТЬ</button>
                    </div>
                
                    <div class="search__results">

                    <?php
                        if ($_GET["request"] ?? null){
                            echo "<h2> Книги по запросу " . "\"".$_GET['request']."\"" . "</h2>";
                        }else{
                            echo "<h2>Лидеры продаж</h2>";
                        }
                    ?>
                    <div class="results__wrapper">
                    <?php
                        if ($_GET["request"] ?? null){
                            $requestValue = "\"".$_GET['request']."\"";
                            $tmp = shell_exec("parse.py " . $requestValue);
                            $decoded = mb_convert_encoding(hex2bin(trim($tmp)), 'UTF-8', 'auto');
                        }else{
                            $tmp = shell_exec("parse.py");
                            $decoded = mb_convert_encoding(hex2bin(trim($tmp)), 'UTF-8', 'auto');
                        }
                        echo $decoded;
                        ?>
                    </div>


                
                    </div>
                </div>
                

дайте мне блять спокойно пожить неужели так тяжело я хочу стабильного хорошего или хотя бы нормального состояния мне эмоционально очень плохо я не хочу кататься на таких качелях лучше один раз скатиться в пизду и потихоньку из нее выбираться а не то что происходит сейчас
                
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