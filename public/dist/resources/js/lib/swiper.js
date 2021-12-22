var carousel = new Swiper(".swiper-container", {
  slidesPerView: 6,
  slidesPerColumn: 4,
  // loop: true,
  auto: {
    delay: 1000,
    disableOnInteraction: false,
  },
  speed: 0,
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next-unique",
    prevEl: ".swiper-button-prev-unique",
  },
  allowTouchMove: false,
});
