$(document).ready(function () {
  // $(".vertical-rolling").slick({
  //   slidesToShow: 1,
  //   rows: 1,
  //   autoplay: true,
  //   vertical: true,
  //   slidesToScroll: 1,
  //   autoplaySpeed: 1000,
  //   nextArrow: $(".next"),
  //   prevArrow: $(".prev"),
  // });
  $(".oneslide-lots").slick({
    slidesToShow: 3,
    rows: 4,
    slidesToScroll: 3,
    autoplaySpeed: 1000,
  });
  $(".list_book").slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
  });
});
var clicks = 0;

function plusClick() {
  clicks += 1;
  if (clicks == 3) clicks = 1;
  document.getElementById("clicks").innerHTML = clicks;
}
function minusClick() {
  clicks -= 1;
  if (clicks < 1) clicks = 1;
  document.getElementById("clicks").innerHTML = clicks;
}
