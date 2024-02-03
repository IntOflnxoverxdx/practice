document.addEventListener('DOMContentLoaded', function () {
    const apply = document.querySelector("#sort__apply");
    const wrapper = document.querySelector(".results__wrapper");
    function sort(by){
        let bookSortInfo;
        switch (by) {
            case "name":
                bookSortInfo = document.querySelectorAll('.book__name');
                break;
            case "author":
                bookSortInfo = document.querySelectorAll('.book__author');
                 break;
        
            default:
                bookSortInfo = document.querySelectorAll('.book__author');
                break;
        }

        let booksArray = Array.from(bookSortInfo);

        booksArray.sort(function(a, b) {
            var nameA = a.textContent.trim().toUpperCase();
            var nameB = b.textContent.trim().toUpperCase();
            return nameA.localeCompare(nameB);
        });

        wrapper.innerHTML = '';

        booksArray.forEach(function(book) {
            wrapper.appendChild(book.closest('.bookCover'));
        });
    }

    function search(text){
        
        let booksArray = Array.from(document.querySelectorAll('.book__name'));


        booksArray.forEach(book => {
            if (~book.textContent.trim().toLocaleUpperCase().indexOf(text.toUpperCase())){
                book.closest('.bookCover').style = "display:flex;"

            }else{
                book.closest('.bookCover').style = "display:none;"
            }
        });
        // booksArray.sort(function(a, b) {
        //     var nameA = a.textContent.trim().toUpperCase();
        //     var nameB = b.textContent.trim().toUpperCase();
        //     return nameA.localeCompare(nameB);
        // });

        wrapper.innerHTML = '';

        booksArray.forEach(function(book) {
            wrapper.appendChild(book.closest('.bookCover'));
        });
    }

    apply.onclick = function(){
        console.log(document.querySelector("#sort__select").value);
        sort(document.querySelector("#sort__select").value);
        search(document.querySelector("#search__inname").value);

    }
    sort("name");
})

document.querySelector(".catalog__sort").style = `height: ${document.querySelector(".catalog__sort").scrollHeight + 70}px;`