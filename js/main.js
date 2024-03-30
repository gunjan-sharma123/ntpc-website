/*-----------------------------------------------------------------------------------

    Theme Name: Renuma - Solar & Renewable Energy HTML Template
    Description: Solar & Renewable Energy HTML Template
    Author: Website Design Templates
    Version: 1.0
        
    ---------------------------------- */

(function ($) {
  "use strict";

  var $window = $(window);

  $("#preloader").fadeOut("normall", function () {
    $(this).remove();
  }),
    $window.on("scroll", function () {
      var e = $window.scrollTop(),
        o = $(".navbar-brand img"),
        t = $(".navbar-brand.logodefault img");
      e <= 175
        ? ($("header").removeClass("scrollHeader").addClass("fixedHeader"),
          o.attr("src", "img/logo.png"))
        : ($("header").removeClass("fixedHeader").addClass("scrollHeader"),
          o.attr("src", "img/logo.png")),
        t.attr("src", "img/logo.png");
    }),
    $window.on("scroll", function () {
      500 < $(this).scrollTop()
        ? $(".scroll-to-top").fadeIn(400)
        : $(".scroll-to-top").fadeOut(400);
    }),
    $(".scroll-to-top").on("click", function (e) {
      e.preventDefault(), $("html, body").animate({ scrollTop: 0 }, 600);
    });
  var pageSection = $(".parallax,.bg-img");
  pageSection.each(function (e) {
    $(this).attr("data-background") &&
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
  });
  var wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: !1,
    live: !0,
  });
  function fullScreenHeight() {
    var e = $(".full-screen"),
      o = $window.height();
    e.css("min-height", o);
  }
  function ScreenFixedHeight() {
    var e = $("header").height(),
      o = $(".screen-height"),
      e = $window.height() - e;
    o.css("height", e);
  }
  function SetResizeContent() {
    fullScreenHeight(),
      ScreenFixedHeight(),
      $(window).width() < 992 &&
        $(".navbar-nav .dropdown-menu.sub-menu").css("display", "none");
  }
  wow.init(),
    $(".story-video").magnificPopup({ delegate: ".video", type: "iframe" }),
    $(".source-modal").magnificPopup({
      type: "inline",
      mainClass: "mfp-fade",
      removalDelay: 160,
    }),
    $(".current-year").text(new Date().getFullYear()),
    0 !== $(".copy-clipboard").length &&
      (new ClipboardJS(".copy-clipboard"),
      $(".copy-clipboard").on("click", function () {
        var e = $(this);
        e.text();
        e.text("Copied"),
          setTimeout(function () {
            e.text("Copy");
          }, 2e3);
      })),
    $window.resize(function (e) {
      setTimeout(function () {
        SetResizeContent();
      }, 500),
        e.preventDefault();
    }),
    SetResizeContent();


  $(document).ready(function () {
    // $(".testimonial-carousel1").owlCarousel({loop:!0,responsiveClass:!0,autoplay:!0,smartSpeed:1500,nav:!1,dots:!1,thumbs:!0,thumbsPrerendered:!0,center:!1,margin:50,responsive:{0:{items:1,margin:0},768:{items:1},992:{items:1},1200:{items:1}}}),$(".testimonial-carousel2").owlCarousel({loop:!0,responsiveClass:!0,autoplay:!0,smartSpeed:1500,nav:!1,dots:!0,thumbs:!1,thumbsPrerendered:!0,center:!1,margin:30,responsive:{0:{items:1},992:{items:2}}}),$(".testimonial-carousel3").owlCarousel({loop:!0,responsiveClass:!0,autoplay:!0,autoplayTimeout:5e3,smartSpeed:1500,nav:!1,dots:!1,thumbs:!1,thumbsPrerendered:!1,center:!1,margin:50,items:1}),$(".portfolio-carousel").owlCarousel({loop:!0,responsiveClass:!0,autoplay:!0,autoplayTimeout:5e3,smartSpeed:1500,nav:!1,dots:!0,center:!1,margin:30,responsive:{0:{items:1},576:{items:2},768:{items:3},992:{items:3},1200:{items:4}}}),$(".portfolio-carousel2").owlCarousel({loop:!0,responsiveClass:!0,autoplay:!0,autoplayTimeout:5e3,smartSpeed:1500,nav:!1,dots:!1,center:!1,margin:0,responsive:{0:{items:1},576:{items:2},768:{items:2},992:{items:3},1400:{items:4}}}),$(".client-carousel").owlCarousel({loop:!0,responsiveClass:!0,autoplay:!0,autoplayTimeout:5e3,smartSpeed:1500,nav:!1,dots:!1,center:!1,margin:30,responsive:{0:{items:1},481:{items:2},768:{items:3},992:{items:4},1200:{items:6}}}),$(".client-carousel2").owlCarousel({loop:!0,responsiveClass:!0,autoplay:!0,autoplayTimeout:5e3,smartSpeed:1500,nav:!1,dots:!1,center:!1,margin:30,responsive:{0:{items:1},481:{items:2},768:{items:3},992:{items:4},1200:{items:5,margin:40},1400:{items:6,margin:40}}}),$(".why-choose-carousel").owlCarousel({loop:!0,responsiveClass:!0,autoplay:!0,smartSpeed:900,nav:!1,dots:!0,center:!1,margin:30,responsive:{0:{items:1},768:{items:2},1200:{items:3}}}),$(".slider-fade").owlCarousel({items:1,loop:!0,dots:!0,margin:0,nav:!1,navText:["<span class='ti-arrow-left'></span>","<span class='ti-arrow-right'></span>"],autoplay:!0,smartSpeed:1500,mouseDrag:!0,animateIn:"fadeIn",animateOut:"fadeOut",responsive:{992:{nav:!0,dots:!1}}}),$(".owl-carousel").owlCarousel({items:1,loop:!0,dots:!1,margin:0,autoplay:!0,smartSpeed:500}),$(".slider-fade").on("changed.owl.carousel",function(e){e=e.item.index-2;$("span").removeClass("animated fadeInUp"),$("h1").removeClass("animated fadeInUp"),$("p").removeClass("animated fadeInUp"),$("a").removeClass("animated fadeInUp"),$(".owl-item").not(".cloned").eq(e).find("span").addClass("animated fadeInUp"),$(".owl-item").not(".cloned").eq(e).find("h1").addClass("animated fadeInUp"),$(".owl-item").not(".cloned").eq(e).find("p").addClass("animated fadeInUp"),$(".owl-item").not(".cloned").eq(e).find("a").addClass("animated fadeInUp")}),0!==$(".horizontaltab").length&&$(".horizontaltab").easyResponsiveTabs({type:"default",width:"auto",fit:!0,tabidentify:"hor_1",activate:function(e){var a=$(this),s=$("#nested-tabInfo");$("span",s).text(a.text()),s.show()}}),$(".countup").counterUp({delay:25,time:2e3}),$(".countdown").countdown({date:"01 Jun 2026 00:01:00",format:"on"}),$(".navbar-nav li.has-sub").removeClass("active")
    // // powerSlider

    $(".countup").counterUp({
      delay: 25,
      time: 2e3,
    }),
      $(".countdown").countdown({
        date: "01 Jun 2026 00:01:00",
        format: "on",
      });

 

    if ($(".cursor-helper").length) {
      var cursor = document.querySelector(".cursor-helper-outer");
      var cursorinner = document.querySelector(".cursor-helper-inner");
      var a = document.querySelectorAll("a");
      var footer = document.querySelectorAll("footer");
      var owlcarousel = document.querySelectorAll(".owl-carousel");

      document.addEventListener("mousemove", function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      });

      document.addEventListener("mousemove", function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursorinner.style.left = x + "px";
        cursorinner.style.top = y + "px";
      });

      document.addEventListener("mousedown", function () {
        cursor.classList.add("click");
        cursorinner.classList.add("cursor-helper-innerhover");
      });

      document.addEventListener("mouseup", function () {
        cursor.classList.remove("click");
        cursorinner.classList.remove("cursor-helper-innerhover");
      });

      a.forEach((item) => {
        item.addEventListener("mouseover", () => {
          cursor.classList.add("cursor-link");
        });
        item.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor-link");
        });
      });

      footer.forEach((item) => {
        item.addEventListener("mouseover", () => {
          cursor.classList.add("cursor-light");
        });
        item.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor-light");
        });
      });

      owlcarousel.forEach((item) => {
        item.addEventListener("mouseover", () => {
          cursor.classList.add("cursor-slider");
        });
        item.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor-slider");
        });
      });
    }
  });

  $window.on("load", function () {
    var i = $(".portfolio-gallery-isotope").isotope({});
    $(".filtering").on("click", "span", function () {
      var o = $(this).attr("data-filter");
      i.isotope({ filter: o });
    }),
      $(".filtering").on("click", "span", function () {
        $(this).addClass("active").siblings().removeClass("active");
      }),
      $(".portfolio-gallery,.portfolio-gallery-isotope").lightGallery(),
      $(".portfolio-link").on("click", (o) => {
        o.stopPropagation();
      });
  });



})(jQuery);
