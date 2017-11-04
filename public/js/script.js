import WOW from 'wowjs'
export default function initialise()
{
    console.log('update from script.js')
    $(".en").click(function () {
        $(".dropdown-languge").slideDown();
    });
    $(".dropdown-languge").click(function () {
        $(this).slideUp();
    });
    $(".carousel-slider").not('.slick-initialized').slick({
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
    $(".carousel-slider2").not('.slick-initialized').slick({
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
    $(".row > *[data-order],.row-reverse > *[data-order]").each(function () {
        var colOrder = $(this).attr("data-order");
        $(this).css("order", colOrder)
    });
    
    $(".cols-gutter-40").parent().css({
        "padding-right": "20px",
        "padding-left": "20px",
    });

    $(".cols-gutter-50").parent().css({
        "padding-right": "25px",
        "padding-left": "25px",
    });
    
    $(".row-masonry").each(function(){
        var colmnsNumber = $(this).attr("data-columns");
        $(this).css({
            "-webkit-column-count":colmnsNumber,
            "-moz-column-count":colmnsNumber,
            "column-count":colmnsNumber,
        })
    })
    
    $(".card .card-footer").each(function(){
        var cardFooter = $(this).height();
        $(this).parent().css({
            "padding-bottom": cardFooter + "px",
        });
    });
    
    /*=== Navigation menu ===*/
    $(".navigation-menu").each(function () {
        $(this).prepend(" <button class='menu-button ti-menu'></button> ");
        $(this).children("ul").not(".mobile-menu").parent().append("<div class='mobile-menu'></div>");
        $(this).append("<span class='overlay-close'></span>");
        var mobileClone = $(this).children("div.mobile-menu");
        $(this).children("ul").not(".mobile-menu").clone().appendTo(mobileClone);
        $(".navigation-menu ul").parent("li").children("a").addClass("submenu ti-arrow-down");
        $(".navigation-menu .megamenu").siblings("a").addClass("submenu ti-arrow-down").parent("li").css("position", "static");
    });
	
    $(".navigation-menu .menu-button,.navigation-menu .overlay-close").on("click", function () {
        $(this).siblings(".mobile-menu").toggleClass("active").siblings(".menu-button").toggleClass("active");
    });
	
    $(".mobile-menu .submenu").on("click", function (mobtnEvent) {
        mobtnEvent.preventDefault();
        $(this).siblings("ul,.megamenu").slideToggle(700);
        $(this).parent("li").toggleClass("active").siblings("li").removeClass("active").children("ul,.megamenu").slideUp(700);
    });
	
    $(".sticky-navbar,[data-sticky]").stick_in_parent();
	
    $(".sticky-footer").each(function () {
        var stickyFooter = $(this).height();
        $(this).parent().css({
            "padding-bottom": stickyFooter + "px",
            "position": "relative",
        });
    });

    /*=== Dropdowns ===*/
    $(".dropdown-btn").each(function () {
        var dropdownbg = $(this).css("background-color");
        var dropdowncolor = $(this).css("color");
        $(this).next(".dropdown").css({
            "background-color": dropdownbg,
            "color": dropdowncolor
        }).parent().css("position", "relative");

        $(this).next(".dropdown").find("a").css({
            "color": dropdowncolor
        });

        $(this).click(function (e) {
            e.preventDefault();
            $(this).next(".dropdown").slideToggle(300).toggleClass("opened")
        });
    });

    /*=== Close if clicks outside ===*/
    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-btn')) {
            var dropdowns = document.getElementsByClassName("opened");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('opened')) {
                    $(".opened").fadeOut(350);
                    openDropdown.classList.remove('opened');
                }
            }
        }
    }
    
    /*=== Forms ===*/
    $("*[placeholder]").each(function () {
        var placeHold = $(this).attr("placeholder");
        $(this).on({
            focusin: function () {
                $(this).attr("placeholder", " ");
            },
            
            focusout: function () {
                $(this).attr("placeholder", placeHold);
            }
        })
    });
    
    $('.datepicker').datepicker({
        autoHide:true,
        zIndex:99,
    });
    
    $("body").on("change",".file-input input[type='file']", function (){
        var filePath = [];
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            filePath.push($(this).get(0).files[i].name);
        }
        $(this).siblings(".file-path").val(filePath); 
    });
    
    $('.tags-input').tagsInput({
		'height':'auto',
		'width':'100%',
	})
    
    
    
    $(".autocomplete").each(function() {
        var apiurl = $(this).attr("data-url");
        var dataVal = $(this).attr("data-val");
        var options = {
          url: apiurl,
          getValue:dataVal,
          list: {	
            match: {
              enabled: true
            }
          },
          theme: "square"
        };
        
        $(this).easyAutocomplete(options);
    })
	
	$(".range-slider").each(function(){
		var dataMin = $(this).attr("data-min");
		var dataMax = $(this).attr("data-max");
		var rangeWidth = $(this).parent().innerWidth();
		$(this).jRange({
			from: dataMin,
			to: dataMax,
			step: 1,
			scale: [dataMin,dataMax],
			format: '%s',
			width:rangeWidth -15,
			showLabels: true,
			snap:true,
		});
	});
    
    $(".alert .close-alert").on("click", function (){
        $(this).parent(".alert").fadeOut(500);
    });
	
    $(".clone-btn").click(function(e){
        e.preventDefault();
        var conewrap = $(this).parent().clone();
        $(this).parent().after(conewrap).next(".form-clone").children(".clone-btn").addClass("remove-clone ti-minus-io").removeClass("ti-plus-io clone-btn");
    });
    
    $("body").on("click",".remove-clone", function(e){
        e.preventDefault();
        $(this).parent().remove();
    });
    
    
	/*=== Tooltip ===*/
	$(".tooltip").each(function (){
		var tooltipTitle = $(this).attr("title");
		$(this).append("<a href='javascript:void(0)' class='tooltip-box'>" + tooltipTitle + "</a>");
		$(this).removeAttr("title");
	});
	
	/*=== accordion ===*/
    $(".accordion:not(.collapsed) .accordion-item:first-of-type .accordion-title").addClass("active").next(".accordion-content").addClass("active");
	$(".accordion-title").on("click", function(){
		$(this).toggleClass("active").parent(".accordion-item").siblings().children(".accordion-title").removeClass("active");
		$(this).next(".accordion-content").slideToggle(350).toggleClass("active").parent(".accordion-item").siblings().children(".accordion-content").slideUp(350).removeClass("active");
	});
	
	/*=== Tabs System ===*/
	$(".tabs .tabs-menu li:first-child").addClass("active");
    $(".tabs .tab-content:first-of-type").addClass("active");
	$(".tabs-menu li").on("click", function (){
		var tabID = $(this).attr("data-tab");
		$(this).addClass("active").siblings().removeClass("active");
		$("#" + tabID).fadeIn(0).addClass("active").siblings(".tab-content").hide().removeClass("active");
	});
	
	/*=== Modals ===*/
	$(".modal-box").each(function (){
		$(this).prepend("<span class='modal-overlay'></span>");
	});
	
	$("[data-modal]").on("click", function(){
		$('a[data-modal]').attr('href','javascript:void(0)');
		var modalName = $(this).attr("data-modal");
		$("#" + modalName).toggleClass("active");
	});
	
	$(".modal-box .modal-overlay,.modal-box .close-modal").on("click", function(){
		$('a.close-modal').attr('href','javascript:void(0)');
		$(".modal-box").removeClass("active");
	});
	
	/* lightbox.option({
		'resizeDuration': 600,
		'wrapAround': true,
		disableScrolling:true,
		fadeDuration:600,
		fitImagesInViewport:true,
		imageFadeDuration:600,
    }); */
	/*===== Progress ====*/
	$(".progress-bar").each(function (){
		var dataValue = $(this).attr("data-value");
		var dataColor = $(this).attr("data-color");
		$(this).children(".bar").css({
			"width":dataValue + "%",
			"background-color":dataColor,
		})
	});
	
	$(".progress-bar.textual").each(function (){
		var dataValue = $(this).attr("data-value");
		$(this).children(".bar").text(dataValue + "%")
	});
    
    /*======= Backgrounds ======*/
    $("[data-src]").each(function (){
        var backgroundImage = $(this).attr("data-src");
        $(this).css( "background-image","url(" + backgroundImage + ")" );
    });
    
    $(".video-bg").each(function (){
        $(this).parent().css({
            "overflow":"hidden",
            "position":"relative",
            "-webkit-backface-visibility":"hidden",
            "backface-visibility":"hidden",
            "-webkit-transform":"translateZ(0)",
            "transform":"translateZ(0)",
        });
    });
	
    /*=== Scrollspy ===*/
	/* $(".scrollspy").each(function (){
        var fixedNav = $(".sticky-navbar").height();
        $(this).scrollspy({ 
            offset: -fixedNav,
            animate:true,
        });
    }); */
    
    /* === viewport animations ===*/
    $("[data-delay]").each(function () {
        var vpDelay = $(this).attr("data-delay");
        $(this).css({
            "-webkit-animation-delay": vpDelay,
            "animation-delay": vpDelay,
        });
    });
    
    $("[class*='flipInX'],[class*='flipInY']").each(function (){
        $(this).parent().css({
            "-webkit-perspective": "1300px",
            "perspective": "1300px",
        });
    });
    
    /*=== wow.js ===*/
    function afterReveal(el){ 
        el.addEventListener('animationend', function(event){
            $(this).addClass("viewActive") 
        });
    } 
    window.wow = new WOW.WOW({ callback: afterReveal })
    window.wow.init()
    
    /*=== Parallax Mouse ===*/
    $('.parallax-mbg').on("mousemove",function(e){
        var x = -(e.pageX + this.offsetLeft) / 20;
        var y = -(e.pageY + this.offsetTop) / 20;
        $(this).css('background-position', x + 'px ' + y + 'px');
    }); 
    
    $('.parallax-layers').on("mousemove",function (e) {
        parallax(e, this, 1);
        parallax(e, this.getElementsByClassName('layer'), 2);
    });
    
    /*/ ===== Slick Slider ===== /*/
    $("[data-transition='true'] [data-transition]").each(function(){
        var transName = $(this).attr("data-transition");
        var transNameLast = $(this).first().attr("data-transition");
        $(this).prev().attr("data-tsout",transName + "Out");
        $(this).last().attr("data-tsout",transNameLast + "Out");
    });
    
    $(document).ready(function(){
        $('.slick-slider[data-rtl]').slick("slickSetOption","rtl",true,true);
        $('.slick-vertical').slick("slickSetOption","verticalSwiping",true,true);
        $('.slick-slider[data-transition="true"]').slick("slickSetOption","fade",true,false);
    });

    /*/ ==== Marquee ==== /*/
    $(".marquee").each(function (){
        var marqueeSpeed = $(this).attr("data-speed");
        var marqueeDirction = $(this).attr("data-dir");
        $(this).marquee({
            duration: marqueeSpeed,
            gap:30,
            delayBeforeStart: 0,
            direction:marqueeDirction,
            duplicated: true
        });
    });
    
}