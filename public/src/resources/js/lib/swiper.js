var swiper = new Swiper(".swiper-container", {
  slidesPerView: 6,
  speed: 0,
  slidesPerColumn: 4,
  slidesPerGroup: 24,
  spaceBetween: 0,
  lazy: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var carousel = new Swiper(".swiper-container", {
  slidesPerView: 6,
  speed: 0,
  slidesPerColumn: 4,
  slidesPerGroup: 24,
  spaceBetween: 0,
  lazy: true,
  navigation: {
    nextEl: ".swiper-button-next-unique",
    prevEl: ".swiper-button-prev-unique",
  },
});
