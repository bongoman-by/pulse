window.addEventListener("DOMContentLoaded", () => {
  //     $('.carousel__inner').slick({
  //         speed: 1200,
  //         adaptiveHeight: true,
  //         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
  //         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
  //         responsive: [
  //             {
  //                 breakpoint: 992,
  //                 settings: {
  //                     dots: true,
  //                     arrows: false
  //                 }
  //             }
  //         ]
  //     });

  new WOW().init();

  const slider = tns({
    container: ".carousel__inner",
    items: 1,
    slideBy: "page",
    autoplay: false,
    controls: false,
    nav: false,
  });

  document.querySelector(".prev").addEventListener("click", function () {
    slider.goTo("prev");
  });

  document.querySelector(".next").addEventListener("click", function () {
    slider.goTo("next");
  });

  function tabs() {
    const tabsParent = document.querySelector(".catalog"),
      tabs = tabsParent.querySelectorAll(".catalog__tab"),
      tabsContent = tabsParent.querySelectorAll(".catalog__content");

    function hideTabContent() {
      tabsContent.forEach((item) => {
        item.classList.remove("catalog__content_active");
      });
      tabs.forEach((item) => {
        item.classList.remove("catalog__tab_active");
      });
    }

    function showTabContent(i = 0) {
      tabsContent[i].classList.add("catalog__content_active");
      tabs[i].classList.add("catalog__tab_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
      const target = event.target;
      if (target && target.classList.contains("catalog__tab")) {
        tabs.forEach((item, i) => {
          if (target === item) {
            hideTabContent();
            showTabContent(i);
            return;
          }
        });
      }
      if (
        target.closest("li") &&
        target.closest("li").classList.contains("catalog__tab")
      ) {
        tabs.forEach((item, i) => {
          if (target.closest("li") === item) {
            hideTabContent();
            showTabContent(i);
            return;
          }
        });
      }
    });
  }

  function view() {
    const itemsContent = document.querySelectorAll(".catalog-item__content"),
      itemsList = document.querySelectorAll(".catalog-item__list");

    function run(selector) {
      items = document.querySelectorAll(selector);
      items.forEach((item) => {
        item.addEventListener("click", (event) => {
          const target = event.target;
          console.log(target.closest("div"));
          if (target) {
            if (
              target
                .closest("div")
                .classList.contains("catalog-item__content_active")
            ) {
              itemsContent.forEach((itemContent, i) => {
                if (target.closest("div") === itemContent) {
                  select(i, itemsContent, itemsList, [
                    "catalog-item__content_active",
                    "catalog-item__list_active",
                  ]);
                  return;
                }
              });
            } else if (
              target
                .closest("div")
                .classList.contains("catalog-item__list_active")
            ) {
              itemsList.forEach((itemList, i) => {
                if (target.closest("div") === itemList) {
                  select(i, itemsList, itemsContent, [
                    "catalog-item__list_active",
                    "catalog-item__content_active",
                  ]);
                  return;
                }
              });
            }
          }
          event.preventDefault();
        });
      });
    }

    function select(i = 0, hideItems, showItems, classes) {
      hideItems[i].classList.remove(classes[0]);
      showItems[i].classList.add(classes[1]);
    }

    run(".catalog-item__back");
    run(".catalog-item__link");
  }

  tabs();
  view();

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button_mini").on("click", function () {
    $(".overlay, #order").fadeIn("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          maxlength: 6,
        },
        phone: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "We need your name to contact you",
          maxlength: jQuery.validator.format("Hay que max {0} characters!"),
        },
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com",
        },
      },
    });
  }

  validateForms("#order form");
  validateForms("#consultation form");
  validateForms("#consultation-form");

  $("input[name=phone]").mask("+7 (999) 999-9999");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });

  // smooth scroll and pageup

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn("slow");
    } else {
      $(".pageup").fadeOut("slow");
    }
  });

  $("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });


});
