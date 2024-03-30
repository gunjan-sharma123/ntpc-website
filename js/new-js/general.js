(function($) {

    /*================= Global Variable Start =================*/
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var IEbellow9 = !$.support.leadingWhitespace;
    var iPhoneAndiPad = /iPhone|iPod/i.test(navigator.userAgent);
    var isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;

    function isIEver() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }
    //if (isIEver () == 8) {}

    var base_url = $("input[id=base_url]").val();
    var jsFolder = base_url + "/themes/ntpc/js/";
    var cssFolder = base_url + "themes/ntpc/css/";
    var ww = document.body.clientWidth,
        wh = document.body.clientHeight;
    var mobilePort = 870,
        ipadView = 870,
        wideScreen = 1600;

    /*================= Global Variable End =================*/

    //css3 style calling 
    document.write('<link rel="stylesheet" type="text/css" href="' + cssFolder + 'animate.css">');

    const $js = function(el) {
        return $('[data-js=' + el + ']')
    };





    /*================= On Document Load Start =================*/
    $(document).ready(function() {

        $('#filterForm').submit(function(e) {
            e.preventDefault(); // Prevent default form submission

            var url = base_url + "filter.php";
            // AJAX request
            $.ajax({
                type: 'POST',
                url: url,
                data: $(this).serialize(), // Serialize form data
                success: function(response) {
                    $('#results').html(response); // Update results div
                }
            });
        });

        function carousel() {
            $js('timeline-carousel').slick({
                infinite: false,
                arrows: false,
                dots: true,
                autoplay: false,
                speed: 1100,
                slidesToShow: 2,
                slidesToScroll: 2,
                responsive: [{
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        }

        carousel();
        //Swipe speed:
        var tolerance = 100; //px.
        var speed = 650; //ms.

        //Elements:
        var interactiveElements = $('input, button, a');
        var itemsLength = $('.history_panel').length;
        var active = 1;

        //Background images:
        for (i = 1; i <= itemsLength; i++) {
            var $layer = $(".history_panel:nth-child(" + i + ")");
            var bgImg = $layer.attr("data-img");
            $layer.css({
                "background": "url(" + bgImg + ") no-repeat center / cover"
            });
        };

        //Transitions:
        setTimeout(function() {
            $(".history_panel").css({
                "transition": "cubic-bezier(.4,.95,.5,1.5) " + speed + "ms"
            });
        }, 200);

        //Presets:
        $(".history_panel:not(:first)").addClass("right");

        //Swipe:
        function swipeScreen() {
            $('.history_swiper').on('mousedown touchstart', function(e) {

                var touch = e.originalEvent.touches;
                var start = touch ? touch[0].pageX : e.pageX;
                var difference;

                $(this).on('mousemove touchmove', function(e) {
                    var contact = e.originalEvent.touches,
                        end = contact ? contact[0].pageX : e.pageX;
                    difference = end - start;
                });

                //On touch end:
                $(window).one('mouseup touchend', function(e) {
                    e.preventDefault();

                    //Swipe right:
                    if (active < itemsLength && difference < -tolerance) {
                        $(".history_panel:nth-child(" + active + ")").addClass("left");
                        $(".history_panel:nth-child(" + (active + 1) + ")").removeClass("right");
                        active += 1;
                        btnDisable();
                    };

                    // Swipe left:
                    if (active > 1 && difference > tolerance) {
                        $(".history_panel:nth-child(" + (active - 1) + ")").removeClass("left");
                        $(".history_panel:nth-child(" + active + ")").addClass("right");
                        active -= 1;
                        btnDisable();
                    };

                    $('.history_swiper').off('mousemove touchmove');
                });

            });
        };
        swipeScreen();

        //Prevent swipe on interactive elements:
        interactiveElements.on('touchstart touchend touchup', function(e) {
            e.stopPropagation();
        });

        //Buttons:
        $(".btn-prev").click(function() {
            // Swipe left:
            if (active > 1) {
                $(".history_panel:nth-child(" + (active - 1) + ")").removeClass("left");
                $(".history_panel:nth-child(" + active + ")").addClass("right");
                active -= 1;
                btnDisable();
            };
        });

        $(".btn-next").click(function() {
            //Swipe right:
            if (active < itemsLength) {
                $(".history_panel:nth-child(" + active + ")").addClass("left");
                $(".history_panel:nth-child(" + (active + 1) + ")").removeClass("right");
                active += 1;
                btnDisable();
            };
        });

        function btnDisable() {
            if (active >= itemsLength) {
                $(".btn-next").prop("disabled", true);
                $(".btn-prev").prop("disabled", false);
            } else if (active <= 1) {
                $(".btn-prev").prop("disabled", true);
                $(".btn-next").prop("disabled", false);
            } else {
                $(".btn-prev, .btn-next").prop("disabled", false);
            };
        };

    });
    $(document).ready(function() {
        //Javacript for video slider navigation
        var btns = document.querySelectorAll(".nav-btn");
        var slides = document.querySelectorAll(".video-slide");
        var contents = document.querySelectorAll(".slideContent");
        var sliderNav = function(manual) {
            btns.forEach((btn) => {
                btn.classList.remove("active");
            });
            slides.forEach((slide) => {
                slide.classList.remove("active");
            });
            contents.forEach((content) => {
                content.classList.remove("active");
            });
            btns[manual].classList.add("active");
            slides[manual].classList.add("active");
            contents[manual].classList.add("active");
        }
        btns.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                sliderNav(i);
            });
        });

        $(".video-slide:first").addClass('active');
        $(".slideContent:first").addClass('active');

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 1) {
                $("#header").addClass("sticky");
            } else {
                $("#header").removeClass("sticky");
            }
        });

        var titleMain = $(".slickSlider");
        var titleSubs = titleMain.find("view-list-item");

        if (titleMain.length) {

            titleMain.slick({
                autoplay: true,
                arrows: false,
                dots: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                centerPadding: "",
                draggable: true,
                infinite: true,
                pauseOnHover: true,
                swipe: true,
                touchMove: false,
                vertical: true,
                verticalScrolling: true,
                speed: 1200,
                //autoplaySpeed: 0,
                useTransform: false,
                cssEase: 'linear',
                touchThreshold: 100,
                variableWidth: false
            });
            /* On init
      $("ul.whats-new-ul .view-list-item").each(function(index, el) {
        $("ul.whats-new-ul").slick('slickAdd', "<li>" + el.innerHTML + "</li>");
      }); */

            // Manually refresh positioning of slick
            //titleMain.slick('slickPlay');
        };
        AOS.init();

        if ($("body").hasClass('path-user') || $("body").hasClass('path-member')) {
            var base_url = $('#base_url').val();
            if ($("form.user-login-form").length) {
                $("input[name='hiddenText']").val(base_url);
            }
        }
        if ($('body').hasClass('path-user') || $("body").hasClass('path-member')) {
            var base_url = $('#base_url').val();
            var encryptUrl = base_url + 'encrypt/jencrypt';
            $("form#user-login-form").jCryption({
                getKeysURL: encryptUrl + "?getPublicKey=true",
                handshakeURL: encryptUrl + "?handshake=true"
            });
            $("form#user-register-form").jCryption({
                getKeysURL: encryptUrl + "?getPublicKey=true",
                handshakeURL: encryptUrl + "?handshake=true"
            });

            $("form#user-pass").jCryption({
                getKeysURL: encryptUrl + "?getPublicKey=true",
                handshakeURL: encryptUrl + "?handshake=true"
            });


        }

        if ($('body').hasClass('page-node-type-feedback')) {
            var base_url = $('#base_url').val();
            var encryptUrl = base_url + 'encrypt/jencrypt';
            $("form.node-feedback-form").jCryption({
                getKeysURL: encryptUrl + "?getPublicKey=true",
                handshakeURL: encryptUrl + "?handshake=true"
            });
        }
        if ($('body').hasClass('path-contact')) {
            var base_url = $('#base_url').val();
            var encryptUrl = base_url + 'encrypt/jencrypt';
            $("form.contact-message-feedback-form").jCryption({
                getKeysURL: encryptUrl + "?getPublicKey=true",
                handshakeURL: encryptUrl + "?handshake=true"
            });
        }
        if ($('body').hasClass('page-node-type-incubation-services')) {
            var base_url = $('#base_url').val();
            var encryptUrl = base_url + 'encrypt/jencrypt';
            $("form.node-incubation-services-booking-form").jCryption({
                getKeysURL: encryptUrl + "?getPublicKey=true",
                handshakeURL: encryptUrl + "?handshake=true"
            });
        }
        if ($("form#simplenews-subscriptions-block-f61c8429-5940-4215-81f7-91264c8c34cf").length) {
            var base_url = $('#base_url').val();
            var encryptUrl = base_url + 'encrypt/jencrypt';
            $("form#simplenews-subscriptions-block-f61c8429-5940-4215-81f7-91264c8c34cf").jCryption({
                getKeysURL: encryptUrl + "?getPublicKey=true",
                handshakeURL: encryptUrl + "?handshake=true"
            });
        }

        $('.options').each(function() {
            (function($set) {
                function changer() {

                    var $cur = $set.find('.active').removeClass('active');
                    var $next = $cur.next().length ? $cur.next() : $set.children().eq(0);
                    var $evnt = $next[0].classList[1];
                    $next.addClass('active').trigger('classChanged');

                };

                var $myTimer = setInterval(changer, 10000);

                $(".chart").mouseover(function() { clearInterval($myTimer) });
                $(".chart").mouseout(function() { $myTimer = setInterval(changer, 10000); });
            })($(this));

        });
        $('.option').on('click', function() {
            $('.options').each(function() {
                $('.option').removeClass('active');
                $('.chartHead').removeClass('active');
            });

            var $evnt = $(this)[0].classList[1];
            $(this).addClass('active');
            $('.' + $evnt).addClass('active').trigger('classChanged');

        });


        $(window).on("load", function() {
            $(".evnt1").trigger('classChanged');
        });
        $(".evnt1").on('classChanged', function() { $("h2.evnt1").addClass('active').delay(9000).queue(function() { $(this).removeClass('active').dequeue(); }); });
        $(".evnt2").on('classChanged', function() { $("h2.evnt2").addClass('active').delay(10000).queue(function() { $(this).removeClass('active').dequeue(); }); });
        $(".evnt3").on('classChanged', function() { $("h2.evnt3").addClass('active').delay(10000).queue(function() { $(this).removeClass('active').dequeue(); }); });
        $(".evnt4").on('classChanged', function() { $("h2.evnt4").addClass('active').delay(10000).queue(function() { $(this).removeClass('active').dequeue(); }); });
        $(".evnt5").on('classChanged', function() { $("h2.evnt5").addClass('active').delay(10000).queue(function() { $(this).removeClass('active').dequeue(); }); });
        $(".evnt6").on('classChanged', function() { $("h2.evnt6").addClass('active').delay(10000).queue(function() { $(this).removeClass('active').dequeue(); }); });
        $(".evnt7").on('classChanged', function() { $("h2.evnt7").addClass('active').delay(10000).queue(function() { $(this).removeClass('active').dequeue(); }); });
        $(".evnt8").on('classChanged', function() { $("h2.evnt8").addClass('active').delay(10000).queue(function() { $(this).removeClass('active').dequeue(); }); });


        $('body').removeClass('noJS').addClass("hasJS");
        $(this).scrollTop(0);
        getWidth();

        //Set Element to vertical center using padding
        $.fn.verticalAlign = function() { return this.css("padding-top", ($(this).parent().height() - $(this).height()) / 2 + 'px'); };

        setTimeout(function() {
            $('#loading').fadeOut();
            $('.vCenter').each(function() { $(this).verticalAlign(); });
        }, 100);


        if ($('form#node-feedback-form').length) {

            $("#node-feedback-form").validate({
                rules: {
                    'title': {
                        required: true
                    },
                    'title[0][value]': {
                        required: true,
                        lettersonly: true
                    },
                    'field_feedback_email[0][value]': {
                        required: true,
                        email: true
                    },
                    'field_feedback_subject[0][value]': {
                        required: true
                    },
                    'field_feedback_message[0][value]': {
                        required: true
                    },
                    'field_feedback_contact[0][value]': {
                        required: true,
                        number: true,
                        rangelength: [10, 10]
                    },
                    'field_reason': {
                        required: {
                            depends: function(element) {
                                if ('_none' == $('#edit-field-reason').val()) {
                                    //Set predefined value to blank.
                                    $('#edit-field-reason').val('');
                                }
                                return true;
                            }
                        }
                        //required: true    
                    },
                    'captcha_response': {
                        required: true
                    }
                },
                messages: {
                    'title': {
                        required: 'Please enter name'
                    },
                    'title[0][value]': {
                        required: 'Please enter name',
                        lettersonly: 'Please enter valid name'
                    },
                    'field_feedback_email[0][value]': {
                        required: 'Please enter email',
                        email: 'Please enter valid email'
                    },
                    'field_feedback_subject[0][value]': {
                        required: 'Please enter subject'
                    },
                    'field_feedback_message[0][value]': {
                        required: 'Please enter message'
                    },
                    'field_feedback_contact[0][value]': {
                        required: 'Please enter contact number',
                        number: 'Please enter only digits value',
                        rangelength: 'Please enter maximum and minimum 10 digits'
                    },
                    'field_reason': {
                        required: 'Please select purpose'
                    },
                    'captcha_response': {
                        required: 'Please enter text showing in the Image',
                    }
                },
                submitHandler: function(form) {
                    form.submit()
                }
            });


            $('label[for="edit-field-purpose-other-0-value"]').hide();
            $('#edit-field-purpose-other-0-value').hide();
            $('#edit-field-reason').change(function() {
                if ($('#edit-field-reason').val() == '346') {
                    $('label[for="edit-field-purpose-other-0-value"]').show();
                    $('#edit-field-purpose-other-0-value').show();
                } else {
                    $('label[for="edit-field-purpose-other-0-value"]').hide();
                    $('#edit-field-purpose-other-0-value').hide();
                }
            });

        }
        if ($('form#node-feedback-edit-form').length) {

            $("#node-feedback-edit-form").validate({
                rules: {
                    'title': {
                        required: true
                    },
                    'title[0][value]': {
                        required: true,
                        lettersonly: true
                    },
                    'field_feedback_email[0][value]': {
                        required: true,
                        email: true
                    },
                    'field_feedback_subject[0][value]': {
                        required: true
                    },
                    'field_feedback_message[0][value]': {
                        required: true
                    },
                    'field_feedback_contact[0][value]': {
                        required: true,
                        number: true,
                        rangelength: [10, 10]
                    },
                    'field_reason': {
                        required: {
                            depends: function(element) {
                                if ('_none' == $('#edit-field-reason').val()) {
                                    //Set predefined value to blank.
                                    $('#edit-field-reason').val('');
                                }
                                return true;
                            }
                        }
                        //required: true    
                    },
                    'captcha_response': {
                        required: true
                    }
                },
                messages: {
                    'title': {
                        required: 'Please enter name'

                    },
                    'title[0][value]': {
                        required: 'Please enter name',
                        lettersonly: 'Please enter valid name'
                    },
                    'field_feedback_email[0][value]': {
                        required: 'Please enter email',
                        email: 'Please enter valid email'
                    },
                    'field_feedback_subject[0][value]': {
                        required: 'Please enter subject'
                    },
                    'field_feedback_message[0][value]': {
                        required: 'Please enter message'
                    },
                    'field_feedback_contact[0][value]': {
                        required: 'Please enter contact number',
                        number: 'Please enter only digits value',
                        rangelength: 'Please enter maximum and minimum 10 digits'
                    },
                    'field_reason': {
                        required: 'Please select reason'
                    },
                    'captcha_response': {
                        required: 'Please enter text showing in the Image',
                    }
                },
                submitHandler: function(form) {
                    form.submit()
                }
            });

        }

        if ($('form#node-incubation-services-booking-form').length) {

            $("#node-incubation-services-booking-form").validate({
                rules: {
                    'title': {
                        required: true
                    },
                    'title[0][value]': {
                        required: true
                    },
                    'field_incubation_booking_email[0][value]': {
                        required: true,
                        email: true
                    },
                    'field_incubation_booking_details[0][value]': {
                        required: true
                    },
                    'field_incubation_booking_subject[0][value]': {
                        required: true
                    },
                    'field_incubation_booking_message[0][value]': {
                        required: true
                    },
                    'field_incubation_booking_contact[0][value]': {
                        required: true,
                        number: true,
                        rangelength: [10, 10]
                    },
                    'captcha_response': {
                        required: true
                    }
                },
                messages: {
                    'title': {
                        required: 'Please enter name'
                    },
                    'title[0][value]': {
                        required: 'Please enter name'
                    },
                    'field_incubation_booking_email[0][value]': {
                        required: 'Please enter email',
                        email: 'Please enter valid email'
                    },
                    'field_incubation_booking_subject[0][value]': {
                        required: 'Please enter subject'
                    },
                    'field_incubation_booking_details[0][value]': {
                        required: 'Please enter incubation details'
                    },
                    'field_incubation_booking_message[0][value]': {
                        required: 'Please enter message'
                    },
                    'field_incubation_booking_contact[0][value]': {
                        required: 'Please enter contact number',
                        number: 'Please enter only digits value',
                        rangelength: 'Please enter maximim and minimum 10 digits'
                    },
                    'captcha_response': {
                        required: 'Please enter text showing in the Image',
                    }
                },
                submitHandler: function(form) {
                    form.submit()
                }
            });

        }

        if ($('form#node-incubation-services-booking-edit-form').length) {

            $("#node-incubation-services-booking-edit-form").validate({
                rules: {
                    'title': {
                        required: true
                    },
                    'title[0][value]': {
                        required: true
                    },
                    'field_incubation_booking_email[0][value]': {
                        required: true,
                        email: true
                    },
                    'field_incubation_booking_details[0][value]': {
                        required: true
                    },
                    'field_incubation_booking_subject[0][value]': {
                        required: true
                    },
                    'field_incubation_booking_message[0][value]': {
                        required: true
                    },
                    'field_incubation_booking_contact[0][value]': {
                        required: true,
                        number: true,
                        rangelength: [10, 10]
                    },
                    'captcha_response': {
                        required: true
                    }
                },
                messages: {
                    'title': {
                        required: 'Please enter name'
                    },
                    'title[0][value]': {
                        required: 'Please enter name'
                    },
                    'field_incubation_booking_email[0][value]': {
                        required: 'Please enter email',
                        email: 'Please enter valid email'
                    },
                    'field_incubation_booking_subject[0][value]': {
                        required: 'Please enter subject'
                    },
                    'field_incubation_booking_details[0][value]': {
                        required: 'Please enter incubation details'
                    },
                    'field_incubation_booking_message[0][value]': {
                        required: 'Please enter message'
                    },
                    'field_incubation_booking_contact[0][value]': {
                        required: 'Please enter contact number',
                        number: 'Please enter only digits value',
                        rangelength: 'Please enter maximim and minimum 10 digits'
                    },
                    'captcha_response': {
                        required: 'Please Enter text showing in the Image',
                    }
                },
                submitHandler: function(form) {
                    form.submit()
                }
            });

        }

        if ($('form#node-career-profile-form').length) {

            $("#node-career-profile-form").validate({
                rules: {
                    'title': {
                        required: true
                    },
                    'title[0][value]': {
                        required: true,
                        lettersonly: true
                    },
                    'field_career_last_name[0][value]': {
                        required: true,
                        lettersonly: true
                    },
                    'field_career_email[0][value]': {
                        required: true,
                        email: true
                    },
                    'field_career_zip_code[0][value]': {
                        required: true,
                        number: true,
                        rangelength: [6, 6]
                    },
                    'field_career_city': {
                        required: {
                            depends: function(element) {
                                if ('_none' == $('#edit-field-career-city').val()) {
                                    //Set predefined value to blank.
                                    $('#edit-field-career-city').val('');
                                }
                                return true;
                            }
                        }
                    },
                    'field_career_state_province': {
                        required: {
                            depends: function(element) {
                                if ('_none' == $('#edit-field-career-state-province').val()) {
                                    //Set predefined value to blank.
                                    $('#edit-field-career-state-province').val('');
                                }
                                return true;
                            }
                        }
                    },
                    'field_applying_for_position': {
                        required: {
                            depends: function(element) {
                                if ('_none' == $('#edit-field-applying-for-position').val()) {
                                    //Set predefined value to blank.
                                    $('#edit-field-applying-for-position').val('');
                                }
                                return true;
                            }
                        }
                    },
                    'field_career_address[0][value]': {
                        required: true
                    },
                    'field_career_phone_number[0][value]': {
                        required: true,
                        number: true,
                        rangelength: [10, 10]
                    },
                    'captcha_response': {
                        required: true
                    }
                },
                messages: {
                    'title': {
                        required: 'Please enter name'
                    },
                    'title[0][value]': {
                        required: 'Please enter first name',
                        lettersonly: 'Please enter valid first name'
                    },
                    'field_career_last_name[0][value]': {
                        required: 'Please enter last name',
                        lettersonly: 'Please enter valid last name'
                    },
                    'field_career_email[0][value]': {
                        required: 'Please enter email',
                        email: 'Please enter valid email'
                    },
                    'field_career_phone_number[0][value]': {
                        required: 'Please enter phone number',
                        number: 'Please enter only digits value',
                        rangelength: 'Please enter maximum and minimum 10 digits'
                    },
                    'field_career_zip_code[0][value]': {
                        required: 'Please enter zip code',
                        number: 'Please enter only digits value',
                        rangelength: 'Please enter maximum and minimum 6 digits'
                    },
                    'field_career_city': {
                        required: 'Please select city'
                    },
                    'field_career_state_province': {
                        required: 'Please select state/province'
                    },
                    'field_applying_for_position': {
                        required: 'Please select position'
                    },
                    'field_career_address[0][value]': {
                        required: 'Please enter address',
                    },
                    'captcha_response': {
                        required: 'Please enter text showing in the Image',
                    }
                },
                submitHandler: function(form) {
                    form.submit()
                }
            });

        }

        if ($('form#node-career-profile-edit-form').length) {

            $("#node-career-profile-edit-form").validate({
                rules: {
                    'title': {
                        required: true
                    },
                    'title[0][value]': {
                        required: true,
                        lettersonly: true
                    },
                    'field_career_last_name[0][value]': {
                        required: true,
                        lettersonly: true
                    },
                    'field_career_email[0][value]': {
                        required: true,
                        email: true
                    },
                    'field_career_zip_code[0][value]': {
                        required: true,
                        number: true,
                        rangelength: [6, 6]
                    },
                    'field_career_city': {
                        required: {
                            depends: function(element) {
                                if ('_none' == $('#edit-field-career-city').val()) {
                                    //Set predefined value to blank.
                                    $('#edit-field-career-city').val('');
                                }
                                return true;
                            }
                        }
                    },
                    'field_career_state_province': {
                        required: {
                            depends: function(element) {
                                if ('_none' == $('#edit-field-career-state-province').val()) {
                                    //Set predefined value to blank.
                                    $('#edit-field-career-state-province').val('');
                                }
                                return true;
                            }
                        }
                    },
                    'field_applying_for_position': {
                        required: {
                            depends: function(element) {
                                if ('_none' == $('#edit-field-applying-for-position').val()) {
                                    //Set predefined value to blank.
                                    $('#edit-field-applying-for-position').val('');
                                }
                                return true;
                            }
                        }
                    },
                    'field_career_address[0][value]': {
                        required: true,
                    },
                    'field_career_phone_number[0][value]': {
                        required: true,
                        number: true,
                        rangelength: [10, 10]
                    },
                    'captcha_response': {
                        required: true
                    }
                },
                messages: {
                    'title': {
                        required: 'Please enter name'
                    },
                    'title[0][value]': {
                        required: 'Please enter first name',
                        lettersonly: 'Please enter valid first name'
                    },
                    'field_career_last_name[0][value]': {
                        required: 'Please enter last name',
                        lettersonly: 'Please enter valid last name'
                    },
                    'field_career_email[0][value]': {
                        required: 'Please enter email',
                        email: 'Please enter valid email'
                    },
                    'field_career_phone_number[0][value]': {
                        required: 'Please enter phone number',
                        number: 'Please enter only digits value',
                        rangelength: 'Please enter maximum and minimum 10 digits'
                    },
                    'field_career_zip_code[0][value]': {
                        required: 'Please enter zip code',
                        number: 'Please enter only digits value',
                        rangelength: 'Please enter maximum and minimum 6 digits'
                    },
                    'field_career_city': {
                        required: 'Please select city'
                    },
                    'field_career_state_province': {
                        required: 'Please select state/province'
                    },
                    'field_applying_for_position': {
                        required: 'Please select position'
                    },
                    'field_career_address[0][value]': {
                        required: 'Please enter address',
                    },
                    'captcha_response': {
                        required: 'Please enter text showing in the Image',
                    }
                },
                submitHandler: function(form) {
                    form.submit()
                }
            });

        }

        // Index Banner Slider  
        if ($(".sliderBanner").length) {
            var owl = $(".sliderBanner");
            var autoplay;
            if (owl.children().length == 1) { autoplay = false } else { autoplay = true }
            owl.owlCarousel({
                loop: autoplay,
                autoplay: autoplay,
                mouseDrag: autoplay,
                autoplayTimeout: 2000,
                autoplaySpeed: 2000,
                smartSpeed: 2000,
                nav: autoplay,
                dots: false
                    //,animateIn: 'fadeIn'  
                    ,
                items: 1,
                autoplayHoverPause: true
                    //dots : false      
                    ,
                onInitialized: function(event) {
                    if (owl.children().length > 1) {
                        //owl.trigger('stop.owl.autoplay');
                        //this.settings.autoplay = true;
                        //this.settings.loop = true;
                    }
                }
            });


            if ($(".indexBanner .item").length) {

                setTimeout(function() {

                    $('.indexBanner .item > img').each(function() {
                        var banimgSrc = $(this).attr('src');
                        $(this).parent().css('background-image', 'url(' + banimgSrc + ')');

                    });

                }, 1000);

            }

        };

        if ($(".bgBackgound  img").length) {
            $('.bgBackgound  img').each(function() {
                var banimgSrc = $(this).attr('src');
                $(this).parent().css('background-image', 'url(' + banimgSrc + ')');

            });
        }

        if ($(".stpiOpenChallImgHolder img").length) {
            $('.stpiOpenChallImgHolder  img').each(function() {
                var banimgSrc = $(this).attr('src');
                $(this).parents(".stpiOpenChallImgHolder").css('background-image', 'url(' + banimgSrc + ')');

            });
        }


        if ($(".innerBannerSection  img").length) {
            $('.innerBannerSection  img').each(function() {
                var banimgSrc = $(this).attr('src');
                $(this).parent().css('background-image', 'url(' + banimgSrc + ')');

            });
        }

        //scheme slider
        if ($(".scheme").length) {
            $('.schemeSlider ').owlCarousel({
                loop: true,
                autoplay: true

                    ,
                autoWidth: false,
                autoplayTimeout: 2000,
                smartSpeed: 500,
                margin: 30,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1024: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }
            })
        };



        //scheme slider
        if ($(".incubationSlider").length) {
            $('.incubationSlider ').owlCarousel({
                loop: true,
                autoplay: true

                    ,
                autoWidth: false,
                autoplayTimeout: 2000,
                smartSpeed: 500

                    ,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    1024: {
                        items: 1
                    },
                    1200: {
                        items: 1
                    }
                }
            })
        };


        //services slider
        if ($(".servicesWarpper").length) {
            $('.servicesWarpper ').owlCarousel({
                loop: true,
                autoplay: true,
                autoWidth: false,
                autoplayTimeout: 2000,
                smartSpeed: 500,
                margin: 0,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1024: {
                        items: 3
                    },
                    1200: {
                        items: 5
                    }
                }
            })
        };



        //new window open for external link
        $('a').not(".litebox, .singleVideoPopup, .colorbox, .video-popup,.socialIcone a,.directorateInfo a, .noExteMessage").filter(function() {
            return this.hostname && this.hostname !== location.hostname;
        }).click(function(e) {
            e.preventDefault();
            var url = $(this).attr("href");
            smoke.confirm("You are about to proceed to an external website. Click Yes to proceed.", function(e) {
                if (e) {
                    window.open(url, "_blank");
                } else {
                    return false;
                }
            }, {
                ok: "Yes",
                cancel: "No",
                classname: "custom-class",
                reverseButtons: true
            });
        });

        // Inner Banner Slider  
        if ($(".slider").length) {
            var owl2 = $(".slider");
            var autoplay;
            if (owl2.children().length == 1) { autoplay = false } else { autoplay = true }

            owl2.owlCarousel({
                loop: autoplay,
                autoplay: autoplay,
                mouseDrag: autoplay,
                autoplayTimeout: 2000,
                autoplaySpeed: 500,
                smartSpeed: 500,
                nav: autoplay,
                dots: autoplay,
                items: 1,
                autoplayHoverPause: true
                    //dots : false      
                    ,
                onInitialized: function(event) {
                    if (owl2.children().length > 1) {}
                }
            });
        };


        //clientLogo
        if ($(".clientLogo").length) {
            $('.clientLogo .owl-carousel').owlCarousel({
                loop: true,
                autoplay: true,
                autoWidth: false,
                autoplayTimeout: 2000,
                smartSpeed: 500,
                margin: 30,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    640: {
                        items: 3
                    },
                    901: {
                        items: 4
                    },
                    1200: {
                        items: 5
                    }
                }
            })
        };

        // updates slider
        // if( $(".updateslider").length) {
        //   var owl2 = $(".updateslider");
        //   var autoplay;
        //   if (owl2.children().length == 1) {autoplay = false  }
        //   else {autoplay = true}

        //   owl2.owlCarousel({
        //     loop:autoplay
        //     ,autoplay:autoplay
        //     ,mouseDrag:autoplay
        //     ,autoplayTimeout:3000
        //     ,autoplaySpeed:800
        //     ,smartSpeed:1200
        //     ,nav:false
        //     ,dots:false
        //     ,items : 3
        //     ,autoHeight:true
        //     ,autoWidth: false
        //     ,autoplayHoverPause: true 
        //     ,onInitialized: function(event) {
        //       if (owl2.children().length > 1) { 
        //       }
        //     }
        //   });
        // };

        // powerSlider
        if ($(".powerSlider").length) {
            $('.powerSlider ').owlCarousel({
                loop: true,
                autoplay: true,
                autoWidth: false,
                autoplayTimeout: 2000,
                smartSpeed: 800,
                margin: 0,
                nav: false,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    1024: {
                        items: 3
                    },
                    1200: {
                        items: 5
                    }
                }
            });
        };
        // blogSlider
        if ($(".blogSlider").length) {
            var loop;
            if ($(".blogSlider").children().length == 1) { loop = false } else { loop = true }
            $('.blogSlider').owlCarousel({
                loop: loop,
                autoplay: true,
                autoWidth: false,
                autoplayTimeout: 2000,
                smartSpeed: 800,
                margin: 30,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    640: {
                        items: 2
                    },
                    901: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }
            })
        };


        // accordian js start here
        if ($(".accordion").length) {
            $('.accordion .accordDetail').hide();
            $(".accordion .accordDetail:first").show();
            $(".accordion .accTrigger:first").addClass("active");
            $('.accordion .accTrigger').click(function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).next().slideUp();
                } else {
                    if ($('body').hasClass('desktop')) {
                        $('.accordion .accTrigger').removeClass('active');
                        $('.accordion .accordDetail').slideUp();
                    }
                    $(this).addClass('active');
                    $(this).next().slideDown();
                }
                return false;
            });
        };



        //recentblogSlider
        if ($(".overCrousal").length) {
            $('.overCrousal').owlCarousel({
                loop: true,
                autoplay: true,
                autoWidth: false,
                autoplayTimeout: 2000,
                smartSpeed: 800,
                margin: 30,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            })
        };
        if ($(".divCrousal").length) {
            $('.divCrousal').owlCarousel({
                loop: true,
                autoplay: true,
                autoWidth: false,
                autoplayTimeout: 2000,
                smartSpeed: 800,
                margin: 30,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            })
        };
        if ($(".furCrousal").length) {
            $('.furCrousal').owlCarousel({
                loop: true,
                autoplay: true,
                autoWidth: false,
                autoplayTimeout: 3000,
                smartSpeed: 1200,
                margin: 30,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            })
        };

        // Back to Top function
        if ($("#backtotop").length) {
            $(window).scroll(function() {
                if ($(window).scrollTop() > 120) {
                    $('#backtotop').fadeIn('250').css('display', 'block');
                } else {
                    $('#backtotop').fadeOut('250');
                }
            });
            $('#backtotop').click(function() {
                $('html, body').animate({ scrollTop: 0 }, '200');
                return false;
            });
        };

        // Responsive Tabing Script
        if ($(".functionTab .resTab").length) {
            $('.functionTab .resTab').responsiveTabs({
                rotate: false,
                startCollapsed: 'tab' //accordion
                    ,
                collapsible: 'accordion' //accordion
                    ,
                scrollToAccordion: true,
                scrollToAccordionOnLoad: false
            });
        };

        // Responsive Tabing Script
        if ($(".stpiCentersSlider .resTab").length) {
            $('.stpiCentersSlider .resTab').responsiveTabs({
                rotate: false,
                startCollapsed: 'tab' //accordion
                    ,
                collapsible: 'accordion' //accordion
                    ,
                scrollToAccordion: true,
                scrollToAccordionOnLoad: false
            });
        };

        // home page stpi center js start here
        if ($(".stpiCentersSlider .carouselBlock").length) {
            $('.stpiCentersSlider .carouselBlock').owlCarousel({
                loop: false,
                autoplay: false,
                autoWidth: false,
                autoplayTimeout: 3000,
                smartSpeed: 1200,
                margin: 10,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    767: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                }
            })
        };



        // campaign team slider
        if ($(".updateSlider").length) {
            var owl2 = $(".updateSlider");
            var autoplay;
            if (owl2.children().length == 1) { autoplay = false } else { autoplay = true }

            owl2.owlCarousel({
                loop: autoplay,
                autoplay: autoplay,
                mouseDrag: autoplay,
                autoplayTimeout: 3000,
                autoplaySpeed: 800,
                smartSpeed: 1200,
                nav: true,
                dots: false,
                items: 1,
                autoHeight: true,
                autoplayHoverPause: true,
                onInitialized: function(event) {
                    if (owl2.children().length > 1) {}
                }
            });
        };



        // homepage team slider 
        if ($(".teamSlider").length) {
            var teamSlider = $(".teamSlider");
            var autoplay;
            if (teamSlider.children().length == 1) { autoplay = false } else { autoplay = true }

            teamSlider.owlCarousel({
                loop: autoplay,
                autoplay: autoplay,
                mouseDrag: autoplay,
                autoplayTimeout: 3000,
                autoplaySpeed: 800,
                smartSpeed: 1200,
                nav: true,
                dots: false,
                items: 1,
                autoHeight: true,
                autoplayHoverPause: true
                    //dots : false      
                    ,
                onInitialized: function(event) {
                    if (teamSlider.children().length > 1) {}
                }

            });
        };




        //team slider  slider start 
        if ($(".TeamMembersSlider").length) {

            $('.teamSlider ul li').wrapInner('<div class="teamSliderInfo"></div>');

            var teamMember = $(".teamSlider ul li .teamSliderInfo").clone();

            $('.TeamMembersSlider').append('<div class="teamMobSlider"><div class="owlCarousel"></div></div>');
            $(".teamMobSlider .owlCarousel").append(teamMember);
            $('.teamSliderInfo').wrap('<div class="item"></div>');


            //$(".ourService").append("<div class='servicesMobSlider owlCarousel '></div>");
            //var serviceBoxWrap = $(".serviceBoxWrap").clone();
            //$(".servicesMobSlider").append(serviceBoxWrap);
            //$(".servicesMobSlider .serviceBoxWrap").each(function(){
            //$(this).wrap('<div class="item"></div>');
            //})
            //(cloneSector2).appendTo(".servicesWarpper .servicesMobSlider .swiper-wrapper");
        }




        setTimeout(function() {


            //recentblogSlider
            if ($(".teamMobSlider").length) {
                $('.teamMobSlider .owlCarousel').owlCarousel({
                    loop: true,
                    autoplay: false,
                    autoWidth: false,
                    autoplayTimeout: 3000,
                    smartSpeed: 1200,
                    margin: 10,
                    nav: true,
                    dots: false,
                    navText: ["", ""],
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 2
                        },
                        1000: {
                            items: 3
                        }
                    }
                })
            };


        }, 3000);

        //team slider  slider end


        /*if( $(".ourJourney .carouselBlock").length) {
            $('.ourJourney .carouselBlock').owlCarousel({
                 loop:true
                ,autoplay:false
                ,autoplayTimeout:3000
                ,smartSpeed:1200
                ,margin:10
                ,nav:true
                ,dots:false
                ,navText : ["",""]
                ,responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:5
                    },
                    1000:{
                        items:10
                    }
                }
            })
        };*/

        //our journey slider    
        if ($(".ourJourney .carouselBlock").length) {
            $('.ourJourney .carouselBlock').owlCarousel({
                loop: false,
                autoplay: false,
                autoplayTimeout: 3000,
                smartSpeed: 1200,
                margin: 10,
                nav: true,
                dots: false,
                navText: ["", ""],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 4
                    },
                    1300: {
                        items: 7
                    },
                    1300: {
                        items: 10
                    }
                }
            })
        };

        //aos 
        AOS.init({
            once: true,

            disable: function() {
                var maxWidth = 1024;
                return window.innerWidth < maxWidth;
            }

        })



        //board of directors and government countcil homepage slider
        if ($(".boardOfDirectors .carouselBlock").length) {
            $('.boardOfDirectors .carouselBlock').owlCarousel({
                loop: false,
                navRewind: true,
                autoplay: false,
                autoplayTimeout: 3000,
                smartSpeed: 1200,
                margin: 20,
                dots: false,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 1
                    },
                    640: {
                        items: 1
                    },
                    767: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            })
        };


        // count

        /**/
        if ($(".count").length > 0) {
            $('.count').counterUp({
                delay: 1,
                time: 10
            });
        }




        if ($(".marqueeScrolling li").length > 1) {
            var $mq = $('.marquee').marquee({
                speed: 25000,
                gap: 0,
                duplicated: true,
                pauseOnHover: true
            });
            $(".btnMPause").toggle(function() {
                $(this).addClass('play');
                $(this).text('Play');
                $mq.marquee('pause');
            }, function() {
                $(this).removeClass('play');
                $(this).text('Pause');
                $mq.marquee('resume');
                return false;
            });
        };

        // Multiple Ticker  
        if ($(".ticker").length) {
            $('.ticker').each(function(i) {
                $(this).addClass('tickerDiv' + i).attr('id', 'ticker' + i);
                $('#ticker' + i).find('.tickerDivBlock').first().addClass('newsTikker' + i).attr('id', 'newsTikker' + i);
                $('#ticker' + i).find('a.playPause').attr('id', 'stopNews' + i)
                $('#newsTikker' + i).vTicker({ speed: 1E3, pause: 4E3, animation: "fade", mousePause: false, showItems: 3, height: 150, direction: 'up' })
                $("#stopNews" + i).click(function() {
                    if ($(this).hasClass('stop')) {
                        $(this).removeClass("stop").addClass("play").text("Play").attr('title', 'Play');
                    } else {
                        $(this).removeClass("play").addClass("stop").text("Pause").attr('title', 'pause');
                    }
                    return false;
                });
            });
        };





        // Responsive Tabing Script
        if ($(".socialEngagement .resTab").length) {
            $('.socialEngagement .resTab').responsiveTabs({
                rotate: false,
                startCollapsed: 'tab' //accordion
                    ,
                collapsible: 'accordion' //accordion
                    ,
                scrollToAccordion: true,
                scrollToAccordionOnLoad: false
            });
        };




        // Responsive Tabing Script
        if ($(".eventsBox .resTab").length) {
            $('.eventsBox .resTab').responsiveTabs({
                rotate: false,
                startCollapsed: 'tab' //accordion
                    ,
                collapsible: 'accordion' //accordion
                    ,
                scrollToAccordion: true,
                scrollToAccordionOnLoad: false
            });
        };


        // Responsive Tabing Script
        if ($(".ourJourney .resTab").length) {
            $('.ourJourney .resTab').responsiveTabs({
                rotate: false,
                startCollapsed: 'tab' //accordion
                    ,
                collapsible: 'accordion' //accordion
                    ,
                scrollToAccordion: true,
                scrollToAccordionOnLoad: false
            });
        };

        if ($(".accordion").length) {
            $('.accordion .accordDetail').hide();
            $(".accordion .accordDetail:first").show();
            $(".accordion .accTrigger:first").addClass("active");
            $('.accordion .accTrigger').click(function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).next().slideUp();
                } else {
                    if ($('body').hasClass('desktop')) {
                        $('.accordion .accTrigger').removeClass('active');
                        $('.accordion .accordDetail').slideUp();
                    }
                    $(this).addClass('active');
                    $(this).next().slideDown();
                }
                return false;
            });
        };

        if ($(".tableData").length > 0) {
            $('.tableData').each(function() {
                $(this).wrap('<div class="tableOut"></div>');
                $(this).find('tr').each(function() {
                    $(this).find('td:first').addClass('firstTd');
                    $(this).find('th:first').addClass('firstTh');
                    $(this).find('th:last').addClass('lastTh');
                });
                $(this).find('tr:last').addClass('lastTr');
                $(this).find('tr:even').addClass('evenRow');
                $(this).find('tr:nth-child(2)').find('th:first').removeClass('firstTh');
            });
        };

        if ($("table").length > 0) {
            $('table').addClass('responsiveTable');
            $("table").wrap("<div class='tableOut'></div>");
        }

        // Responsive Table
        if ($(".responsiveTable").length) {
            $(".responsiveTable").each(function() {
                $(this).find('td').removeAttr('width');
                //$(this).find('td').removeAttr('align');
                var head_col_count = $(this).find('tr th').size();
                // loop which replaces td
                for (i = 0; i <= head_col_count; i++) {
                    // head column label extraction
                    var head_col_label = $(this).find('tr th:nth-child(' + i + ')').text();
                    // replaces td with <div class="column" data-label="label">
                    $(this).find('tr td:nth-child(' + i + ')').attr("data-label", head_col_label);
                }
            });
        };

        //skip to main content
        $('.skipContent').on('click', function(e) {
            e.preventDefault();

            var target = this.hash;
            var $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 80
            }, 500, 'swing', function() {
                //window.location.hash = target;
            });
        });

        //about page  to main content
        $('.region-footer-about-stpi a').on('click', function(e) {



            var target = this.hash;
            var $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 80
            }, 500, 'swing', function() {
                //window.location.hash = target;

            });

        });

        //about page  to main content


        $('.aboutSkipContent').on('click', function(e) {
            var target = this.hash;
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 80
            }, 500, 'swing', function() {});
        });


        // Search Box
        if ($(".search").length) {
            $('.search > a').click(function(e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active');
                    $(this).next().slideDown(300);
                } else {
                    $(this).removeClass('active');
                    $(this).next().slideUp(300);
                }
                return false;
            });
        }
        $('.search').click(function(e) {
            e.stopPropagation();
        });

        $(document).click(function() {
            $('.search .region-search-section').slideUp();
            $('.search > a').removeClass('active');
        });




        // Responsive Table
        if ($(".tableScroll").length) {
            $(".tableScroll").each(function() {
                $(this).wrap('<div class="tableOut"></div>');
            });
        };

        // Back to Top function
        if ($("#backtotop").length) {
            $(window).scroll(function() {
                if ($(window).scrollTop() > 120) {
                    $('#backtotop').fadeIn('250').css('display', 'block');
                } else {
                    $('#backtotop').fadeOut('250');
                }
            });
            $('#backtotop').click(function() {
                $('html, body').animate({ scrollTop: 0 }, '200');
                return false;
            });
        };

        // Get Focus Inputbox
        if ($(".getFocus").length) {
            $(".getFocus").each(function() {
                $(this).on("focus", function() {
                    if ($(this).val() == $(this)[0].defaultValue) { $(this).val(""); };
                }).on("blur", function() {
                    if ($(this).val() == "") { $(this).val($(this)[0].defaultValue); };
                });
            });
        };

        // For device checking
        if (isMobile == false) {

        };





        // Video JS
        if ($(".videoplayer").length) {
            $(".videoplayer").each(function() {
                var $this = $(this);
                var poster = $this.children("a").find("img").attr("src");
                var title = $this.children("a").find("img").attr("alt");
                var videotype = $this.children("a").attr("rel");
                var video = $this.children("a").attr("href");
                $this.children("a").remove();

                projekktor($this, {
                        poster: poster,
                        title: title,
                        playerFlashMP4: '../videoplayer/jarisplayer.swf',
                        playerFlashMP3: '../videoplayer/jarisplayer.swf',
                        width: "100%",
                        height: 300,
                        controls: false,
                        autoplay: true,
                        scaleVideo: true,
                        loop: true,
                        setResize: true,
                        fullscreen: true,
                        addplugins: ['related'],
                        playlist: [
                            { 0: { src: video, type: videotype } }
                        ],
                        plugin_display: {
                            logoImage: '',
                            logoDelay: 1
                        }
                    }, function(player) {} // on ready 
                );
            })
        };

        // Google Map gmap3 
        if ($("#gmap").length) {

            var lang = 23.021666;
            var lati = 72.55464;
            var contentString = '<div id="content">' +
                '<strong>' + 'Silver Touch Technologies Limited' + '</strong>' +
                '<div id="bodyContent">' + '2nd Floor, Saffron Towers,' + '<br/>' +
                'Near Panchwati Circle,' + '<br/>' +
                'Ahmedabad, Gujarat 380006'
            '</div></div>';

            var map = new google.maps.Map(document.getElementById('gmap'), {
                zoom: 15,
                center: new google.maps.LatLng(lang, lati),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
            });
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(lang, lati)
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
            infowindow.open(map, marker);
        };

        if ($(".litebox").length) {
            $('.litebox').liteBox();
        };

        $('.equalHeights > div').equalHeight();

        setTimeout(function() {
            if ($(".fixedErrorMsg").length) {
                $(".fixedErrorMsg").slideDown("slow");
                setTimeout(function() { $('.fixedErrorMsg').slideUp(); }, 3000);
            }
            if ($(".fixedSuccessMsg").length) {
                $(".fixedSuccessMsg").slideDown("slow");
                setTimeout(function() { $('.fixedSuccessMsg').slideUp(); }, 3000);
            }
        }, 100);

        /*================= On Document Load and Resize Start =================*/
        $(window).on('resize', function() {

            ww = document.body.clientWidth;
            wh = document.body.clientHeight;

            $('.vCenter').each(function() { $(this).verticalAlign(); });

            if ($("body").hasClass("mobilePort")) {
                $("body").removeClass("wob");
            }

            //$('.container').resize(function(){});

        }).trigger('resize');
        /*================= On Document Load and Resize End =================*/

        /*Navigation */
        if (jQuery("#nav").length) {
            if (jQuery(".toggleMenu").length == 0) {
                jQuery("#mainNav").prepend('<a href="#" class="toggleMenu"><span class="mobileMenu">Menu</span><span class="iconBar"></span></a>');
            }
            jQuery(".toggleMenu").click(function() {
                jQuery(this).toggleClass("active");
                jQuery("#nav").slideToggle();
                //return false;
            });

            jQuery(".dropdown ").click(function() {
                jQuery(this).children().children("#nav").slideToggle();
                //return false;
            });


            jQuery("#nav li a").each(function() {
                if (jQuery(this).next().length) {
                    jQuery(this).parent().addClass("parent");
                };
            })
            jQuery("#nav li.parent").each(function() {
                if (jQuery(this).has(".menuIcon").length <= 0) { $(this).append('<i class="menuIcon">&nbsp;</i>') }
            });
            dropdown('nav', 'hover', 1);
            adjustMenu();
        };




        //our services responsive slider start  
        if ($(".ourService").length) {
            $(".ourService").append("<div class='servicesMobSlider owlCarousel '></div>");
            var serviceBoxWrap = $(".serviceBoxWrap").clone();
            $(".servicesMobSlider").append(serviceBoxWrap);
            $(".servicesMobSlider .serviceBoxWrap").each(function() {
                $(this).wrap('<div class="item"></div>');
            })
            //(cloneSector2).appendTo(".servicesWarpper .servicesMobSlider .swiper-wrapper");
        }

        //our services responsive slider end    

        if ($(".ourService").length) {

            $('.servicesMobSlider ').owlCarousel({
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                smartSpeed: 10,
                margin: 0,
                dots: false,
                nav: true,
                center: true,
                responsive: {
                    0: {
                        items: 1
                    },

                    500: {
                        items: 2
                    },

                    767: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                }
            })
        };

        //our services responsive slider end

        //event details start   
        if ($(".eventDetail img").length > 1) {

            $('.eventDetail .eventDetailSlider ').owlCarousel({



                loop: true

                    ,
                autoplay: true,
                autoplayTimeout: 3000,
                smartSpeed: 1200,
                margin: 0,
                dots: false,
                nav: true,
                navText: ["", ""]

                    ,
                responsive: {
                    0: {
                        items: 1
                    },

                    500: {
                        items: 1
                    },

                    767: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            })
        };
        $('.eventDetailSlider img').each(function() {

            var banimgSrc = $(this).attr('src');
            $(this).parent().attr('href', banimgSrc);
        });

        //news details start    
        if ($(".newsDetail").length) {

            $('.newsDetail .newsDetailSlider ').owlCarousel({
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                smartSpeed: 1200,
                margin: 5,
                dots: false,
                nav: true,
                navText: ["", ""]

                    ,
                responsive: {
                    0: {
                        items: 1
                    },

                    500: {
                        items: 2
                    },

                    767: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                }
            })
        };
        $('.newsDetailSlider .owl-item img').each(function() {

            var banimgSrc = $(this).attr('src');
            $(this).parent().attr('href', banimgSrc);
        });




        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>DCPC</small>';
                }
            }
        });



        //news details end






        //center for excellence responsive slider start 
        if ($(".centerOfExce").length) {
            $(".centerOfExce").prepend("<div class='rotatingMobSlider owlCarousel '></div>");
            $(".rotatingMobSlider").insertAfter(".centerOfExce .container > h2")
            var tab = $(".tab ").clone();
            $(".rotatingMobSlider").append(tab);
            $(".rotatingMobSlider .tab").each(function() {
                $(this).wrap('<div class="item"></div>');
            })
            //(cloneSector2).appendTo(".servicesWarpper .servicesMobSlider .swiper-wrapper");
        }

        if ($(".centerOfExce").length) {

            var $owl = $('.rotatingMobSlider');

            $owl.children().each(function(index) {
                $(this).attr('data-position', index); // NB: .attr() instead of .data()
            });

            $owl.owlCarousel({
                center: true,
                loop: false,
                items: 5,
                mouseDrag: false,
                touchDrag: false,
                dots: true,
                nav: true,
                responsive: {
                    0: {
                        items: 1,
                        center: true,
                        mouseDrag: false,
                        touchDrag: false
                    },

                    500: {
                        items: 3,
                        center: true,
                        mouseDrag: false,
                        touchDrag: false
                    },

                    767: {
                        items: 3,
                        center: true,
                        mouseDrag: false,
                        touchDrag: false
                    },
                    1000: {
                        items: 5,
                        center: true,
                        mouseDrag: false,
                        touchDrag: false
                    }
                }
            });

            $owl.on('translated.owl.carousel', function(e) {
                $owl.find(".item a.tab").removeClass("selected");
                $owl.find(".center a.tab").trigger("click").addClass("selected");
            });
            $(document).on('click', '.owl-item>div', function() {
                $owl.trigger('to.owl.carousel', $(this).data('position'));
            });
            setTimeout(function() {
                $(".rotatingMobSlider .owl-item:first").find("a.tab").addClass("selected");
            }, 800);

        };

        $(".rotatingMobSlider h2").click(function() {

            $('.rotatingMobSlider a').removeClass('selected');
            $(this).parent().addClass('selected');


        });

        //center for excellence responsive slider end





        if ($('.datepicker').length) {
            $.datepicker.setDefaults({
                showOn: "both",
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true
                    //,buttonImage: "images/calendar.png"
                    //,buttonImageOnly: true
                    ,
                shortYearCutoff: 50,
                buttonText: "<span class='sprite calIcon'></span>",
                beforeShow: function(textbox, instance) {
                    instance.dpDiv.css({
                        marginTop: /*(textbox.offsetHeight)*/ 0 + 'px',
                        marginLeft: 0 + 'px'
                    });
                }
            });

            $(".datepicker").datepicker({
                dateFormat: "dd/mm/yy",
                showOn: "both",
                buttonText: "<span class='sprite calIcon'></span>",
                shortYearCutoff: 50
                    //,buttonImage: "images/calendar.png"
                    //,buttonImageOnly: true
                    ,
                beforeShow: function(textbox, instance) {
                    instance.dpDiv.css({
                        marginTop: /*(textbox.offsetHeight)*/ 0 + 'px',
                        marginLeft: 0 + 'px'
                    });
                }
            });
        }




        jQuery('.login').on('click', function(event) {
            jQuery('.searchDataToggle').toggle('show');
            event.stopPropagation();
        });
        jQuery('.searchDataToggle').on('click', function(event) {
            event.stopPropagation();
        });


        $(document).on('click', function() {
            jQuery('.searchDataToggle').hide();
        });



        if ($(".datetimepicker").length) {
            $(".datetimepicker").datetimepicker({
                dateFormat: "dd-mm-yy",
                showOn: "both",
                buttonText: "<span class='sprite calIcon'></span>",
                //buttonImage: "images/calendar.png"
                //buttonImageOnly: true,
                beforeShow: function(textbox, instance) {
                    instance.dpDiv.css({
                        marginTop: /*(textbox.offsetHeight)*/ 15 + 'px',
                        marginLeft: -13 + 'px'
                    });
                }
            });
        }






        //megamenu start
        $(".megaMenu").click(function(e) {
            e.preventDefault();
            $("body").addClass("megaMenuBody");
        });
        $(".megaMenuClose").click(function(e) {
            e.preventDefault();
            $("body").removeClass("megaMenuBody");
        });



        $(".aboutSkipContent").click(function(e) {
            $("body").removeClass("megaMenuBody");
        });

        //megamenu end      

        //about section another page about page direct
        if (window.location.hash) {
            var hash = window.location.href;
            var res = '#' + hash.split('#')[1];
            if ($(res).length) {
                setTimeout(function() {
                    $(".region-megamenumegamenu a").each(function() {
                        var targetLink = $(res);
                        $('html,body').animate({ scrollTop: $(targetLink).offset().top - 80 }, 1000);

                    });
                }, 800);
            }
        }




        //$(".panIndia .directorate-data").on('click',function(){
        //alert("hey");    
        //});   

        // Message on Cookie Disabled
        // $.cookie('cookieWorked', 'yes', {  expires : 10, path: '/;SameSite=Strict', secure : true, httponly: true,});
        if ($.cookie('cookieWorked') == 'yes') {} else {
            if ($("div.jsRequired").length == 0) {
                $("body").prepend(
                    '<div class="jsRequired">Cookies are not enabled on your browser. Need to adjust this in your browser security preferences. Please enable cookies for better user experience.</div>'
                );
            }
        }

        $(".cols4 #view-directorate #directorateInfo[data-id = '384']").addClass("active");
        $(".cols4 #view-directorate").each(function() {
            $('.cols4 #view-directorate #directorateInfo').css('display', 'none');
        });
        $(".cols4 #view-directorate #directorateInfo[data-id = '384']").css('display', 'block');
        //map js
        //.directorateLft .selectInfo a
        $(".directorateLft .selectInfo ul li").on('click', function(event) {
            $target = $(event.target);
            $(".directorateLft li a").removeClass("active");
            $target.parent().addClass('active');
            $(".mapLocations .mapIcons").removeClass("active");
            var data = $(".directorateLft li a.active").attr('data-id');
            //alert(data);

            $(".cols4 #view-directorate .directorateInfo[data-id]").each(function() {
                var allDataDirectorateId = $(this).data("id");
                if (data == allDataDirectorateId) {
                    $('.cols4 #view-directorate #directorateInfo').removeClass('active');
                    $('*[data-id="' + data + '"]').addClass('active');
                    if ($('.cols4 #view-directorate #directorateInfo').hasClass('active')) {
                        $('.cols4 #view-directorate #directorateInfo').css('display', 'none');
                        $('*[data-id="' + data + '"]').css('display', 'block');
                    }
                    //$('*[data-id="'+ data +'"]').css('display','block');
                }
            });

        });

    });
    /*================= On Document Load End =================*/

    /*================= On Window Resize Start =================*/
    $(window).bind('resize orientationchange', function() {
        getWidth();
        adjustMenu();
        $('.vCenter').each(function() { $(this).verticalAlign(); });
    });

    /*================= On Window Resize End =================*/

    /*================= On Window Load Start =================*/
    $(window).on("load", function() {
        var tabId = $(".active-slide a").attr("data-id");
        $(".customTabcontent").find(".tabsList").hide();
        $(".customTabcontent").find(".tabsList[data-id=" + tabId + "]").show();

    });
    /*================= On Document Load End =================*/


    function getWidth() {
        ww = document.body.clientWidth;
        if (ww > wideScreen) { $('body').removeClass('device').addClass('desktop widerDesktop'); }
        if (ww > mobilePort && ww <= wideScreen) { $('body').removeClass('device widerDesktop').addClass('desktop'); }
        if (ww <= mobilePort) { $('body').removeClass('desktop widerDesktop').addClass('device'); }
        if (ww > 767 && ww < 1025) { $('body').addClass('ipad'); } else { $('body').removeClass('ipad'); }
    }

})(jQuery);


function validate() {
    return false;
};

$(document).ready(function() {

    //skip to main content for inner pages
    $(".innerPageContent").attr("id", "content");




    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true,
        mainClass: 'mfp-fade'
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps, .video-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    $('.Count').each(function() {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 8000,
            easing: 'swing',
            step: function() {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });

});

/*social sharing poppup*/
$.fn.socialSharingPopup = function(e, intWidth, intHeight, blnResize) {

    // Prevent default anchor event
    e.preventDefault();

    // Set values for window
    intWidth = intWidth || '500';
    intHeight = intHeight || '400';
    strResize = (blnResize ? 'yes' : 'no');

    // Set title and open popup with focus on it
    var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
        strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
        objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
}


$(document).ready(function($) {
    $('.socialIcone a').on("click", function(e) {
        $(this).socialSharingPopup(e);
    });
});

$('.card').hover(function() {
    event.preventDefault();
    $(this).addClass('selected');
    $('.selected .links').each(function(i) {
        var list = $(this);
        list.delay(300 * i).queue(function() {
            list.addClass('show').dequeue();
        });
    });
    $(this).removeClass('selected');
    $('.links').each(function() {
        $(this).removeClass('show');
    });
});