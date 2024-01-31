$(".up_button").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
});

let toggled = 0
$("#nav_button").click(function(){
  document.querySelector("nav").classList.toggle("nav-visible");
  if (toggled){
    document.querySelector("#nav_button").style = "background:url('images/albums/nauka.jpg');background-size:cover;";
  }else{
    document.querySelector("#nav_button").style = "background:url('images/albums/vedro_govna.jpg');background-size:cover;";
  }
  toggled = !toggled;
});