document.addEventListener('DOMContentLoaded', function () {

const search_button = document.getElementById("search__button");
const search_textfield = document.querySelector(".header__search__input");
search_button.addEventListener("click",()=>{
    window.location.replace(`catalog.html?${search_textfield.value}`);
})
}    
)