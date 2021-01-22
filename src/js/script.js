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
                    if (target) {
                          if ( target.closest('div').classList.contains("catalog-item__content_active")) {
                            itemsContent.forEach((itemContent, i) => {
                                if ( target.closest('div') === itemContent) {
                                    select(i, itemsContent, itemsList, ["catalog-item__content_active", "catalog-item__list_active"]);
                                    return;
                                }
                            });
                        } else if (target.closest('ul').classList.contains("catalog-item__list_active")) {
                            itemsList.forEach((itemList, i) => {
                                if (target.closest('ul') === itemList) {
                                      select(i, itemsList, itemsContent, ["catalog-item__list_active", "catalog-item__content_active"]);
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

        run('.catalog-item__back');
        run('.catalog-item__link');
    }

    tabs();
    view();
});
