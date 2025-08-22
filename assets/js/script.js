


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

// Main Portfolio Navigation Script



document.addEventListener("DOMContentLoaded", function () {
  const mainBtns = document.querySelectorAll('#main-filter-nav .filter-btn');
  const subNav = document.getElementById('sub-filter-nav');

  // Fixed: Map of main → sub → layout IDs (matching your HTML)
  const layouts = {
    // REELS
    'reels-nepa-rudraksha': 'reels-nepa-layout',
    'reels-daraz': 'reels-daraz-layout',
    'reels-sharesanskar': 'reels-sharesanskar-layout',

    // LONGFORM
    'longform-nepa-rudraksha': 'longform-nepa-layout',
    'longform-nea': 'longform-nea-layout',

    // LOGO
    'logo-logo-type-1': 'logo-type-1-layout',
    'logo-logo-type-2': 'logo-type-2-layout',

    // ADS
    'ads-facebook-ads': 'ads-facebook-layout',
    'ads-instagram-ads': 'ads-instagram-layout'
  };

  // Fixed: Sub-filter options per main category (matching HTML data-subcategory)
  const subFilters = {
    reels: [
      { display: 'Nepa Rudraksha', value: 'nepa-rudraksha' },
      { display: 'Daraz', value: 'daraz' },
      { display: 'Share Sanskar', value: 'sharesanskar' }
    ],
    longform: [
      { display: 'Nepa Rudraksha', value: 'nepa-rudraksha' },
      { display: 'Nepal Engineers Association', value: 'nea' }
    ],
    logo: [
      { display: 'Logo Type 1', value: 'logo-type-1' },
      { display: 'Logo Type 2', value: 'logo-type-2' }
    ],
    ads: [
      { display: 'Facebook Ads', value: 'facebook-ads' },
      { display: 'Instagram Ads', value: 'instagram-ads' }
    ]
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
    // Remove 'active' class from all main category buttons
    mainBtns.forEach(b => b.classList.remove('active'));
    
    // Add 'active' class to the clicked button
    btn.classList.add('active');

    const selectedCategory = btn.dataset.category; // e.g., 'reels', 'longform'
    const subItems = subFilters[selectedCategory]; // Get the sub-filters for the selected category

    if (subItems && subItems.length > 0) {
      // Dynamically generate sub-filter buttons based on the subItems for the selected category
      subNav.innerHTML = subItems.map((item, i) =>
        `<button class="sub-filter-btn${i === 0 ? ' active' : ''}" data-subcategory="${item.value}">${item.display}</button>`
      ).join('');
      subNav.style.display = 'flex';  // Make the sub-filter navigation visible

      // Add event listeners for each sub-filter button
      const subBtns = subNav.querySelectorAll('.sub-filter-btn');
      subBtns.forEach((subBtn) => {
        subBtn.addEventListener('click', () => {
          // Remove 'active' class from all sub-filter buttons
          subBtns.forEach(b => b.classList.remove('active'));
          
          // Add 'active' class to the clicked sub-filter button
          subBtn.classList.add('active');
          
          hideAllLayouts();  // Hide all layouts first

          // Build the layout key using the selected category and sub-filter value
          const subcategoryValue = subBtn.dataset.subcategory;
          const layoutKey = `${selectedCategory}-${subcategoryValue}`;
          const layoutId = layouts[layoutKey];  // Get the corresponding layout ID
          
          console.log('Looking for layout:', layoutKey, '→', layoutId); // Debug log
          
          if (layoutId) {
            const layoutElement = document.getElementById(layoutId);
            if (layoutElement) {
              layoutElement.style.display = 'block';  // Show the correct layout
              console.log('Showing layout:', layoutId); // Debug log
            } else {
              console.warn('Layout element not found:', layoutId);
            }
          } else {
            console.warn('No layout mapping found for:', layoutKey);
          }
        });
      });

      // Show the default layout for the first sub-filter button
      hideAllLayouts();
      const defaultSub = subItems[0].value;
      const defaultLayoutKey = `${selectedCategory}-${defaultSub}`;
      const defaultLayoutId = layouts[defaultLayoutKey];
      
      console.log('Default layout:', defaultLayoutKey, '→', defaultLayoutId); // Debug log
      
      if (defaultLayoutId) {
        const defaultGrid = document.getElementById(defaultLayoutId);
        if (defaultGrid) {
          defaultGrid.style.display = 'block';  // Display the default layout
          console.log('Showing default layout:', defaultLayoutId); // Debug log
        }
      }

    } else {
      subNav.innerHTML = '';
      subNav.style.display = 'none';  // Hide sub-filter navigation if no sub-filters exist
      hideAllLayouts();  // Hide all layouts if no sub-filters
    }
  }

  // Main nav click event binding
  mainBtns.forEach(btn => {
    btn.addEventListener('click', () => handleMainClick(btn));
  });

  // On load: show REELS → NEPA RUDRAKSHA
  const defaultBtn = document.querySelector('.filter-btn[data-category="reels"]');
  if (defaultBtn) {
    defaultBtn.classList.add('active');
    handleMainClick(defaultBtn);
  }
});

// Nepa Rudraksha Carousel Custom Logic
document.addEventListener('DOMContentLoaded', function () {
  const nepaLayout = document.getElementById('reels-nepa-layout');
  if (!nepaLayout) return;

  const prevBtn = document.getElementById('nepa-carousel-prev');
  const nextBtn = document.getElementById('nepa-carousel-next');
  const indicatorEl = document.getElementById('nepa-carousel-indicator');
  const progressBar = document.getElementById('nepa-progress-bar');
  const seeMoreBtn = nepaLayout.querySelector('.see-more-btn');

  const slides = [
    { title: 'Ajay Devgn as Brand Ambassador', seeMoreUrl: 'https://www.facebook.com/' },
    { title: 'CEO Feature Reels (External)', seeMoreUrl: 'https://www.youtube.com/' },
    { title: 'CEO Feature Reels (Internal)', seeMoreUrl: 'https://www.youtube.com/' },
    { title: 'Creative Visual Content', seeMoreUrl: 'https://www.linkedin.com/' },
    { title: 'Product Showcase Reels', seeMoreUrl: 'https://www.threads.net/' }
  ];

  let currentSlide = 0;

  function bindVideoClickEvents() {
    // Only bind events for videos in the currently visible slide
    const currentSlideEl = nepaLayout.querySelector(`.slide[data-slide-index="${currentSlide}"]`);
    if (!currentSlideEl) return;

    currentSlideEl.querySelectorAll('.item.reel-video').forEach(item => {
      item.onclick = function () {
        const videoId = item.getAttribute('data-video-id');
        if (videoId) {
          // Create lightbox if it doesn't exist
          let lightbox = document.getElementById('video-lightbox');
          if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'video-lightbox';
            lightbox.style.cssText = `
              position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
              background: rgba(0,0,0,0.8); z-index: 9999; display: none;
              align-items: center; justify-content: center;
            `;
            
            const iframe = document.createElement('iframe');
            iframe.id = 'lightbox-iframe';
            iframe.style.cssText = 'width: 80%; height: 80%; max-width: 800px; max-height: 600px;';
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            
            lightbox.appendChild(iframe);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function (e) {
              if (e.target === lightbox) {
                iframe.src = '';
                lightbox.style.display = 'none';
              }
            });
          }
          
          const iframe = lightbox.querySelector('#lightbox-iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
          lightbox.style.display = 'flex';
        }
      };
    });
  }

  function updateCarousel() {
    // Update indicator
    if (indicatorEl) indicatorEl.textContent = `Slide ${currentSlide + 1}/${slides.length}`;
    
    // Update see more button
    if (seeMoreBtn) {
      seeMoreBtn.onclick = () => window.open(slides[currentSlide].seeMoreUrl, '_blank');
    }

    // Update buttons
    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
      prevBtn.style.opacity = currentSlide === 0 ? '0.4' : '1';
      prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
    }

    if (nextBtn) {
      nextBtn.disabled = currentSlide === slides.length - 1;
      nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.4' : '1';
      nextBtn.style.cursor = currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer';
    }

    // Update progress bar
    if (progressBar) {
      const progress = ((currentSlide + 1) / slides.length) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Show only the active slide
    const allSlides = nepaLayout.querySelectorAll('.slide');
    allSlides.forEach((slide, index) => {
      slide.style.display = index === currentSlide ? 'block' : 'none';
    });

    // Bind video click events for the current slide
    bindVideoClickEvents();
  }

  // Button listeners
  prevBtn?.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  nextBtn?.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateCarousel();
    }
  });

  // Initialize carousel
  updateCarousel();
});

})(window.jQuery);