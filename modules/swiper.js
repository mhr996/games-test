export  function swiperInit(){
  var swiper = new Swiper(".swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable:true
    // },
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    //   draggable:true
    // },
  });
}
