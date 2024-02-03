document.addEventListener('DOMContentLoaded', function () {
    let request = window.location.search.substring(9);
    document.querySelector(".header__search__input").value = decodeURI(request);
})