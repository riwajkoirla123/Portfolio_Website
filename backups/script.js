
(function($) {

  "use strict";

  /*------------------------------------------
      = FUNCTIONS
  -------------------------------------------*/

  // Check ie and version
  function isIE () {
      var myNav = navigator.userAgent.toLowerCase();
      return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
  }

  // Toggle mobile navigation
  function toggleMobileNavigation() {
      var navbar = $(".navigation-holder");
      var openBtn = $(".navbar-header .open-btn");
      var closeBtn = $(".navigation-holder .close-navbar");

      openBtn.on("click", function() {
          if (!navbar.hasClass("slideInn")) {
              navbar.addClass("slideInn");
          }
          return false;
      });

      closeBtn.on("click", function() {
          if (navbar.hasClass("slideInn")) {
              navbar.removeClass("slideInn");
          }
          return false;
      });
  }

  toggleMobileNavigation();



    // Function for toggle a class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                 e.preventDefault();
                e.stopImmediatePropagation();
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.find(".slider-bg").attr("src");
                var sliderBg = $this.find(".slider-image");

                sliderBg.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            var $status = $('.pagi-info');

            $(".hero-slider").on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                var i = (currentSlide ? currentSlide : 0) + 1;

                if(i < 10) {
                    i = '0' + i;
                }

                if(slick.slideCount < 10) {
                    var slideCount = '0' + slick.slideCount;
                } else {
                    var slideCount = slick.slideCount;
                }

                $status.text(i + ' / ' + slideCount);
            });

            $(".hero-slider").slick({
                autoplay: true,
                autoplaySpeed: 6000,
                arrows: false,
                dots: true,
                speed: 1000,
                cssEase: 'cubic-bezier(.4,.72,.22,.99)',
                // speed: 1000,
                // fade: true,
                // cssEase: 'ease-in-out',
                draggable: false
            });
        }
    }

    //Active heor slider
    heroSlider();


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }



    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();

    $('.gallery-filters li a:first').click();




    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    // masonryGridSetting();



    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.site-header .navigation').length) {
        cloneNavForSticyMenu($('.site-header .navigation'), "sticky-header");
    }

    var lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass) {
        var st = $(window).scrollTop();
        var mainMenuTop = $('.site-header .navigation');

        if ($(window).scrollTop() > 1000) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.removeClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;
    }


    // HEADER STYLE 1 TOGGLE NAVIGATION SUBMENUS
    if($(".header-style-1").length) {
        var menuItem = $(".navigation-holder > ul .menu-item-has-children > a");
        var menuItemParent = menuItem.parent();

        menuItem.on("click", function(e) {
            e.preventDefault();
            var $this = $(this);
            $this.next(".sub-menu").toggleClass("open-submenu");
            $this.parent().siblings().find(".sub-menu").removeClass("open-submenu");
        })

        var navigationHolder = $(".header-style-1 .navigation-holder");
        var menuOpenBtn = $(".header-style-1 .menu-open-btn");
        var menuClosenBtn = $(".header-style-1 .close-navbar-2");

        menuOpenBtn.on("click", function() {
            navigationHolder.addClass("open-navigation-menu");
        });

        menuClosenBtn.on("click", function() {
            navigationHolder.removeClass("open-navigation-menu");
        });
    }


 /*================================
     Gift-carousel
     ==================================*/
    function testimonial_carousel() {
        var owl = $(".testimonial-active");
        owl.owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                },
                1080: {
                    items: 1
                }
            }
        });
    }
    testimonial_carousel();


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

                address: "required",
            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                address: "Please enter your address",
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }


    // side menu scrollbar
    if($(".header-style-1").length) {
        new PerfectScrollbar('.header-style-1 .navbar-nav');
    }


    // Mouse pointer event style
    $(".page-wrapper").prepend("<div class='mouse-follower'></div>");

    function showCoords(event) {
        var x = event.pageX;
        var y = event.pageY;
        var follower = $(".mouse-follower");
        follower.css({
            left: x + (-12.5) + "px",
            top: y + (-12.5) + "px",
        });

    }

    $(window).on("mousemove", function(event) {
        showCoords(event);
    });

    $("li, a, button, input, textarea, .navbar-toggles").mouseenter(function () {
        $(".mouse-follower").css("opacity", "0");
        $("li, a, button, input, textarea, .navbar-toggles").mouseleave(function () {
            $(".mouse-follower").css("opacity", "1");
        });
    });

 

    /*================================
     Variable Initialize
    ==================================*/
    var headerHeight = $('.site-header').innerHeight();

    // smooth-scrolling
    function smoothScrolling($scrollLinks, $topOffset) {
        var links = $scrollLinks;
        var topGap = $topOffset;

        links.on("click", function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
                if (target.length) {
                    $("html, body").animate({
                    scrollTop: target.offset().top - topGap
                }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }
    /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    $("body").append("<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })    



    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            sliderBgSetting();

            toggleMobileNavigation();

            smallNavFunctionality();

            sortingGallery();
            
            smoothScrolling($("#navbar > ul > li > a[href^='#']"), $(".site-header .navigation").innerHeight());

            smoothScrolling($(".go-contact-area"), $(".site-header .navigation").innerHeight());

        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {
		if ($(".site-header").length) {
            stickyMenu( $('.site-header .navigation'), "sticky-on" );
        }
        
        toggleBackToTopBtn();
    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {

        toggleClassForSmallNav();

        clearTimeout($.data(this, 'resizeTimer'));

        $.data(this, 'resizeTimer', setTimeout(function() {
            smallNavFunctionality();
        }, 200));

    });
    // Close the side menu on ANY nav link click (desktop or mobile)
$(document).on('click', '.navigation-holder a', function() {
    $('.navigation-holder').removeClass('open-navigation-menu');
});
// Close the side menu when any navigation link is clicked
$('.navigation-holder .nav > li > a').on('click', function() {
    $('.navigation-holder').removeClass('open-navigation-menu');
});
// Close the side menu when any navigation link is clicked
$('.navigation-holder .nav > li > a').on('click', function() {
    $('.navigation-holder').removeClass('open-navigation-menu');
});

// // Your Swiper initialization here
// var expSwiper = new Swiper('.experience-swiper', {
//   effect: 'coverflow',
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: 3,
//   initialSlide: 2,
//   coverflowEffect: {
//     rotate: 0,
//     stretch: -100,
//     depth: 250,
//     modifier: 2.5,
//     slideShadows: false,
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   loop: true
// });
document.addEventListener("DOMContentLoaded", function () {
  const mainBtns = document.querySelectorAll('#main-filter-nav .filter-btn');
  const subNav = document.getElementById('sub-filter-nav');

  // Map of main → sub → layout IDs
  const layouts = {
    'reels-NEPA RUDRAKSHA': 'reels-nepa-layout',
    'reels-DARAZ': 'reels-daraz-layout',
    'reels-SHARE SANSKAR': 'reels-sharesanskar-layout'
  };

  // Sub-filter options per main category
  const subFilters = {
    reels: ['NEPA RUDRAKSHA', 'DARAZ', 'SHARE SANSKAR'],
    longform: [],
    logo: [],
    ads: []
  };

  // Hide all portfolio layout sections
  function hideAllLayouts() {
    Object.values(layouts).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  // Handle main category click (e.g., REELS, LONGFORM)
  function handleMainClick(btn) {
    // Toggle main nav active state
    mainBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selected = btn.dataset.category;
    const subItems = subFilters[selected];

    if (subItems && subItems.length > 0) {
      // Build sub-filter buttons (no "All")
      subNav.innerHTML = subItems.map((item, i) =>
        `<button class="sub-filter-btn${i === 0 ? ' active' : ''}">${item}</button>`
      ).join('');
      subNav.style.display = 'flex';

      // Handle sub-filter click events
      const subBtns = subNav.querySelectorAll('.sub-filter-btn');
      subBtns.forEach((subBtn) => {
        subBtn.addEventListener('click', () => {
          subBtns.forEach(b => b.classList.remove('active'));
          subBtn.classList.add('active');
          hideAllLayouts();

          const layoutKey = `${selected}-${subBtn.textContent.trim().toUpperCase()}`;
          const layoutId = layouts[layoutKey];
          if (layoutId) {
            const grid = document.getElementById(layoutId);
            if (grid) grid.style.display = 'grid';
          }
        });
      });

      // Set default sub-filter = NEPA RUDRAKSHA (if exists)
      hideAllLayouts();
      const defaultLayoutKey = `${selected}-NEPA RUDRAKSHA`;
      const defaultLayoutId = layouts[defaultLayoutKey];
      if (defaultLayoutId) {
        const defaultGrid = document.getElementById(defaultLayoutId);
        if (defaultGrid) defaultGrid.style.display = 'grid';

        // Set "Nepa Rudraksha" sub-filter button as active
        subBtns.forEach(btn => {
          if (btn.textContent.trim().toUpperCase() === 'NEPA RUDRAKSHA') {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }

    } else {
      subNav.innerHTML = '';
      subNav.style.display = 'none';
      hideAllLayouts();
    }
  }

  // Add click event to each main filter button
  mainBtns.forEach(btn => {
    btn.addEventListener('click', () => handleMainClick(btn));
  });

  // 🔥 On page load: Default to REELS → NEPA RUDRAKSHA
  const defaultBtn = document.querySelector('.filter-btn[data-category="reels"]');
  if (defaultBtn) {
    defaultBtn.classList.add('active');
    handleMainClick(defaultBtn);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('video-carousel-track');
  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');

  if (!track) return;

  let scrollIndex = 0;
  const videosPerPage = 8;

  const items = track.querySelectorAll('.item.reel-video');
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / videosPerPage);

  function updateVisibleVideos() {
    items.forEach((el, i) => {
      if (i >= scrollIndex * videosPerPage && i < (scrollIndex + 1) * videosPerPage) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  }

  nextBtn.addEventListener('click', () => {
    scrollIndex = Math.min(scrollIndex + 1, totalPages - 1);
    updateVisibleVideos();
  });

  prevBtn.addEventListener('click', () => {
    scrollIndex = Math.max(scrollIndex - 1, 0);
    updateVisibleVideos();
  });

  updateVisibleVideos(); // Initial call
});

// Nepa Rudraksha Carousel Logic
// Only runs if #reels-nepa-layout is present

document.addEventListener('DOMContentLoaded', function () {
  const nepaLayout = document.getElementById('reels-nepa-layout');
  if (!nepaLayout) return;

  // Carousel controls
  const titleEl = document.getElementById('nepa-carousel-title');
  const prevBtn = document.getElementById('nepa-carousel-prev');
  const nextBtn = document.getElementById('nepa-carousel-next');
  const indicatorEl = document.getElementById('nepa-carousel-indicator');
  // Find the see more button (by class, since id was removed)
  let seeMoreBtn = nepaLayout.querySelector('.see-more-btn');

  // Carousel slide data
  const slides = [
    {
      title: 'Ajay Devgn as Brand Ambassador',
      seeMoreUrl: 'https://www.youtube.com/playlist?list=PL_AJAY_DEVGN',
      seeMoreText: 'SEE MORE',
    },
    {
      title: 'CEO Feature Reels',
      seeMoreUrl: 'https://www.youtube.com/playlist?list=PL_CEO_FEATURE',
      seeMoreText: 'SEE MORE',
    },
    {
      title: 'Creative Visual Content',
      seeMoreUrl: 'https://www.youtube.com/playlist?list=PL_CREATIVE_VISUAL',
      seeMoreText: 'SEE MORE',
    },
    {
      title: 'Product Showcase Reels',
      seeMoreUrl: 'https://www.youtube.com/playlist?list=PL_PRODUCT_SHOWCASE',
      seeMoreText: 'SEE MORE',
    },
  ];
  let currentSlide = 0;

  function updateCarousel() {
    // Update title
    if (titleEl) {
      titleEl.textContent = slides[currentSlide].title;
    }
    // Update indicator
    if (indicatorEl) {
      indicatorEl.textContent = `${currentSlide + 1} / ${slides.length}`;
    }
    // Update see more button
    if (seeMoreBtn) {
      seeMoreBtn.onclick = function () {
        window.open(slides[currentSlide].seeMoreUrl, '_blank');
      };
      seeMoreBtn.textContent = slides[currentSlide].seeMoreText;
    }
    // Optionally, you could show/hide different video sets here if you want to extend functionality
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });
  }

  // Initial update
  updateCarousel();
});

})(window.jQuery);