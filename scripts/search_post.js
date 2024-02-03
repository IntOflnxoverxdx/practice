document.addEventListener('DOMContentLoaded', function () {

const search_button = document.getElementById("search__button");
const search_textfield = document.querySelector(".header__search__input");
search_button.addEventListener("click",()=>{
    window.location.replace(`catalog.php?request=${search_textfield.value}`);
})
search_textfield.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13 && search_textfield.value != "") {
        search_button.click();
    }
    });
}    
)