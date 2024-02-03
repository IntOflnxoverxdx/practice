document.addEventListener('DOMContentLoaded', function () {
    
    const nextButton = document.getElementById('carousel__right');
    const prevButton = document.getElementById('carousel__left');
    const recommended = document.querySelectorAll(".recommended__item");
    recommended[0].style = "background: #ff8400;";
    //const circlesUL = document.querySelector('.carousel__circles');
    const images = document.querySelectorAll('.carousel__images a');
    /*images.forEach(e => {
        circlesUL.innerHTML += `<li></li>`;
    });*/
    //const circles = document.querySelectorAll('.carousel__circles li');

    let currentIndex = 0;
    //circles[0].style = "background: #ff8400;";
    
    function showImage(index) {
        for (let i = 0; i < images.length; i++) {
            if (i == currentIndex){
                recommended[i].style = "background: #ff8400; color:white;";
            }else{
                recommended[i].style = "background: #ebebeb;color:black;";
            }
        }
        //const images = document.querySelectorAll('.carousel__images a');
        images.forEach((img, i) => {
            img.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    function nextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        // for (let i = 0; i < circles.length; i++) {
        //     if (i == currentIndex){
        //         circles[i].style = "background: #ff8400;";
        //     }else{
        //         circles[i].style = "background: #7a7a7a;";
        //     }
        // }
        showImage(currentIndex);
    }

    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1;
        }
        showImage(currentIndex);
    }

    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

     recommended.forEach((circle, index) => {
         circle.addEventListener('click', () => {
             currentIndex = index;
             showImage(currentIndex);
         });
     });
    

});

