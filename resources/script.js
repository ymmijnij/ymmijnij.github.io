// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyFunction()};

var nav = document.getElementById("navigation");

var sticky = nav.offsetTop;

function stickyFunction() {
  if (window.pageYOffset > sticky) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}
