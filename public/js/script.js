jQuery(document).ready(function ($) {
    "use strict";
    $(".en").click(function () {
        $(".dropdown-languge").slideDown();
    });
    $(".dropdown-languge").click(function () {
        $(this).slideUp();
    });
    
    $(".carousel-slider").slick({
        rtl: true,
        autoplay: true, // Enables Autoplay
        autoplaySpeed: 5000, // Autoplay Speed in milliseconds
        speed: 500, // Transition Speed In Milliseconds
        slidesToShow: 4, // Number of the visible slides in desktops
        slidesToScroll: 1, // Slide's Number To Scroll
        responsive: [ // Responsive Breack Points
            {
                breakpoint: 981,
                settings: {
                    slidesToShow: 2, // Number of the visible slides in Tablets
                }
            },

            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 1, // Number of the visible slides in Mobile
                }
            },
    ],
        dots: true,
       
    });
        $(".carousel-slider2").slick({
        rtl: true,
        autoplay: true, // Enables Autoplay
        autoplaySpeed: 2000, // Autoplay Speed in milliseconds
        speed: 500, // Transition Speed In Milliseconds
        slidesToShow: 3, // Number of the visible slides in desktops
        slidesToScroll: 1, // Slide's Number To Scroll
        responsive: [ // Responsive Breack Points
            {
                breakpoint: 981,
                settings: {
                    slidesToShow: 2, // Number of the visible slides in Tablets
                }
            },

            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 1, // Number of the visible slides in Mobile
                }
            },
    ],
       
            arrows:true,
       
    });
    
});


//$('.responsive').slick({
//  dots: true,
//  infinite: false,
//  speed: 300,
//  slidesToShow: 4,
//  slidesToScroll: 4,
//  responsive: [
//    {
//      breakpoint: 1024,
//      settings: {
//        slidesToShow: 3,
//        slidesToScroll: 3,
//        infinite: true,
//        dots: true
//      }
//    },
//    {
//      breakpoint: 600,
//      settings: {
//        slidesToShow: 2,
//        slidesToScroll: 2
//      }
//    },
//    {
//      breakpoint: 480,
//      settings: {
//        slidesToShow: 1,
//        slidesToScroll: 1
//      }
//    }
//    // You can unslick at a given breakpoint now by adding:
//    // settings: "unslick"
//    // instead of a settings object
//  ]
//});