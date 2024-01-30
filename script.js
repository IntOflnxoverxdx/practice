window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
    document.querySelector("header").style.maxHeight = "90px";
    document.querySelector("#logo").style.width = "50px";
    Array.from(document.getElementsByTagName("nav")[0].getElementsByTagName("a")).forEach((element) => {
        element.style.padding = "1px"
    });

    //document.getElementsByName("nav>ul>a").style.color = "red";

  } else {
    Array.from(document.getElementsByTagName("nav")[0].getElementsByTagName("a")).forEach((element) => {
        element.style.padding = "10px"
    });
    document.querySelector("#logo").style.width = "120px";
    document.querySelector("header").style.maxHeight = "140px";
  }
}
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        });
    });