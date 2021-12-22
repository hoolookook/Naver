// $(document).ready(function () {
//   $("cate_wrap")
//     .find("a")
//     .hover(
//       function () {
//         $(this).css("text-decoration", "underline");
//       },
//       function () {
//         $(this).css("text-decoration", "none");
//       }
//     );
// });
// $('a').on('mouseenther mouseleave', function{
//     $('.textArea').trigger(e.type);
// })\
// $(document).ready(function () {
//   var currentPosition = parseInt($("#right_item").css("top"));
//   var footerH = $("#footer").outerHeight();

//   $(window).scroll(function () {
//     var position = $(window).scrollTop();
//     $("#right_item")
//       .stop()
//       .animate({ top: position + currentPosition + "px" }, 2000);
//   });
// });
// $(document).ready(function () {
//   $(window).scroll(function () {
//     if ($(window).scrollTop() > 200) {
//       $("#right_item").css("position", "absolute");
//       $("#right_item").css("top", "0");
//     } else if ($(window).scrollTop() <= 200) {
//       $("#right_item").css("position", "");
//       $("#right_item").css("top", "");
//     }
//     if (
//       $("#right_item").offset().top + $("#right_item").height() >
//       $("#footer").offset().top
//     ) {
//       $("#right_item").css(
//         "top",
//         -(
//           $("#right_item").offset().top +
//           $("#right_item").height() -
//           $("#footer").offset().top
//         )
//       );
//     }
//   });
// });
// $(function () {
//   //사이드바 스크롤
//   const scrollHeight = 162;

//   function sidebar() {
//     if ($(window).scrollTop() > scrollHeight) {
//       let top = $(window).scrollTop() - scrollHeight + 20;
//       document.getElementById("right_item").style.top = top + "px";
//     } else {
//       document.getElementById("right_item").style.top = "20px";
//     }
//   }

//   sidebar();

//   $(window).scroll(() => {
//     sidebar();
//   });
// });
// $(function () {
//   var $sidebar = $("#Rwrap"),
//     $window = $(window),
//     offset = $sidebar.offset(),
//     topPadding = 15;

//   $window.scroll(function () {
//     if ($window.scrollTop() > offset.top) {
//       $sidebar.stop().animate({
//         marginTop: $window.scrollTop() - offset.top + topPadding,
//       });
//     } else {
//       $sidebar.stop().animate({
//         marginTop: 0,
//       });
//     }
//   });
// });
// $(document).ready(function () {
//   var $window = $(window);
//   var $sidebar = $("#right_item");
//   var $sidebarHeight = $sidebar.innerHeight();
//   var $footerOffsetTop = $("#footer").offset().top;
//   var $sidebarOffset = $sidebar.offset();

//   $window.scroll(function () {
//     if ($window.scrollTop() > $sidebarOffset.top) {
//       $sidebar.addClass("fixed");
//     } else {
//       $sidebar.removeClass("fixed");
//     }
//     if ($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
//       $sidebar.css({
//         top: $window.scrollTop() + $sidebarHeight - $footerOffsetTop,
//       });
//     } else {
//       $sidebar.css({ top: "0" });
//     }
//   });
// });
