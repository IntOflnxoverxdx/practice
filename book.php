<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Скачай город!</title>
    <link rel="stylesheet" href="style.css">
    <script src="scripts/search_post.js" defer></script>
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
                <?php
                    if ($_GET["src"] ?? null){
                        $link = "\"".$_GET['src']."\"";
                        $tmp = shell_exec("parsebook.py " . $link);
                        $decoded = mb_convert_encoding(hex2bin(trim($tmp)), 'UTF-8', 'auto');
                    }
                    echo $decoded;
                ?>
                

            
            дайте мне блять спокойно пожить неужели так тяжело я хочу стабильного хорошего или хотя бы нормального состояния мне эмоционально очень плохо я не хочу кататься на таких качелях лучше один раз скатиться в пизду и потихоньку из нее выбираться а не то что происходит сейчас
        </div>
    </main>
    <footer>
        <div class="container">
            <p id="credits">Сайт разрабатывал кирилл синус</p>
        </div>
    </footer>
</body>
</html>