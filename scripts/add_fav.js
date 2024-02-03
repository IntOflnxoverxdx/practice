document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".book__name").forEach(name => {
        name.title = name.innerHTML;
    });    
    const favButtons = document.querySelectorAll('.book__mark');
    favButtons.forEach(b => {
        b.onclick = function(){
            b.classList.toggle("book__checked");
            //b.style = "background: url('img/bookmark.png'); background-size:cover;";
        }
    });
});

