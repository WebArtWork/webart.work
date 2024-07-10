$(document).ready(function(){
    $('.tab__list [data-tab]').on('click', function () {
        var $this = $(this);
        var $name = $this.data('tab');
        var $id = $this.closest('.tab__list').data('tab-id');
        var $idEl = $('.tab__body[data-tab-id="' + $id + '"]');

        $this.closest('.tab__list').find('[data-tab]').removeClass('active');
        $this.addClass('active');
        $idEl.find('[data-tab]').hide();
        $idEl.find('[data-tab="' + $name + '"]').show();
        $(window).trigger('resize').trigger('scroll');
    });

    $('a.anchor').on('click', function (e) {
        e.preventDefault();
        var $anchor = $(this).attr('href');
        var $stop = $($anchor).offset().top - 0;
        $('body,html').stop(true, true).animate({scrollTop: $stop}, 1000);
        return false;
    });

    $(".burger-wrap").click(function () {
        $(".header__navigation").toggleClass("header__navigation--open");
        $(".burger").toggleClass('burger--close');
    });
    
    // jobs dropdowns
    $(".country-dd").click(function () {
        $(this).toggleClass("is-active");
        $(".country-list").toggle();
    });
    $(".skill-dd").click(function () {
        $(this).toggleClass("is-active");
        $(".skill-list").toggle();
    });
    $(".tool-dd").click(function () {
        $(this).toggleClass("is-active");
        $(".tool-list").toggle();
    });
    $(".jobs__filter-list").click(function(e) {
        e.stopPropagation();
    });

    $('#skills').multiSelect();
    $('#tools').multiSelect();

    $('.shop__intro-slider').slick({
        dots: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000
    });
});

// opens dropdown - JOBS SEARCH DD
for (const dropdown of document.querySelectorAll(".jobs__search-sort")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.jobs__search-select').classList.toggle('open');
    })
}
// chooses option from drop-down
for (const option of document.querySelectorAll(".jobs__search-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.jobs__search-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.jobs__search-select').querySelector('.jobs__search-trigger span').textContent = this.textContent;
        }
    })
}
window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.jobs__search-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});
function selectOption(index) {
    var optionOnIdx = document.querySelector('.jobs__search-option:nth-child('+index+')');
    var optionSelected = document.querySelector('.jobs__search-option.selected');
    if (optionOnIdx !== optionSelected) {
        optionSelected.parentNode.querySelector('.jobs__search-option.selected').classList.remove('selected');
        optionOnIdx.classList.add('selected');
        optionOnIdx.closest('.jobs__search-select').querySelector('.jobs__search-trigger span').textContent = optionOnIdx.textContent;
    }
}

// skill page language drop-down
for (const dropdown of document.querySelectorAll(".skill__form-sort")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.skill__form-select').classList.toggle('open');
    })
}
for (const option of document.querySelectorAll(".skill__form-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.skill__form-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.skill__form-select').querySelector('.skill__form-trigger span').textContent = this.textContent;
        }
    })
}
window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.skill__form-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});


// shop page drop-down
for (const dropdown of document.querySelectorAll(".products__search-sort")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.products__search-select').classList.toggle('open');
    })
}
// chooses option from drop-down
for (const option of document.querySelectorAll(".products__search-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.products__search-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.products__search-select').querySelector('.products__search-trigger span').textContent = this.textContent;
        }
    })
}
window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.products__search-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});
function selectOption(index) {
    var optionOnIdx = document.querySelector('.products__search-option:nth-child('+index+')');
    var optionSelected = document.querySelector('.products__search-option.selected');
    if (optionOnIdx !== optionSelected) {
        optionSelected.parentNode.querySelector('.products__search-option.selected').classList.remove('selected');
        optionOnIdx.classList.add('selected');
        optionOnIdx.closest('.products__search-select').querySelector('.products__search-trigger span').textContent = optionOnIdx.textContent;
    }
}



var modalOpen = function () {
    var modal = document.getElementById("sendM");
    modal.style.display = "block";
    var modalBack = document.getElementById("modalBack");
    modalBack.style.display = "block";
}
var modalClose = function () {
    var modal = document.getElementById("sendM");
    modal.style.display = "none";
    var modalBack = document.getElementById("modalBack");
    modalBack.style.display = "none";
}



// content toggle for order delivery options 
$('.order__option--delivery .order__option-content').hide();

// here used change instead of click cause in current case radio buttons being styled
$('.order__option--delivery label').change(function(e){
    e.preventDefault();
   
    var $this = $(this).parent().find('.order__option-content');
    $(".order__option--delivery .order__option-content").not($this).hide();

    $this.toggle();
});

// order delivery company options
let selectContainer = document.querySelector(".order__select");
let select = document.querySelector(".order__select-btn");
let input = document.getElementById("select-input");
let options = document.querySelectorAll(".order__select .order__select-item");

select.onclick = () => {
    selectContainer.classList.toggle("active");
};

options.forEach((e) => {
    e.addEventListener("click", () => {
        input.value = e.innerText;
        selectContainer.classList.remove("active");
        options.forEach((e) => {
            e.classList.remove("selected");
        });
        e.classList.add("selected");
    });
});


/*
particlesJS("particles-js", {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 10000
            }
        },
        color: {
            value: "#242526"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 20,
                color: "#000000"
            },
            polygon: {
                nb_sides: 20
            },
            image: {
                src: "img/github.svg",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 15,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 50,
            color: "#000000",
            width: 5
        },
        move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: true,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 300,
                line_linked: {
                    opacity: 0.6
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 2
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

var maxMobile = 80;
var maxTab = 150;
var max = 200;
var checkParticlesCount = function () {
    window.pJSDom[0].pJS.interactivity.modes.push.particles_nb = 2;
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
        if (window.innerWidth < 480 && window.pJSDom[0].pJS.particles.array.length >= maxMobile) {
            window.pJSDom[0].pJS.interactivity.modes.push.particles_nb = 0;
        };
        if (window.innerWidth >= 480 && window.innerWidth < 992 && window.pJSDom[0].pJS.particles.array
            .length >= maxTab) {
            window.pJSDom[0].pJS.interactivity.modes.push.particles_nb = 0;
    };
    if (window.innerWidth >= 992 && window.pJSDom[0].pJS.particles.array.length >= max) {
        window.pJSDom[0].pJS.interactivity.modes.push.particles_nb = 0;
    };

}
}
requestAnimationFrame(checkParticlesCount);
*/

// Get cart from cookie
function getCart() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf('cart_waw=') == 0) {
            return JSON.parse(c.substring('cart_waw='.length, c.length));
        } else return {};
    }
}
 
// Set cart to cookie
function setCart(value) {
    localStorage.setItem('cart_waw', JSON.stringify(value));
    if (!document.cookie) document.cookie = 'cart_waw=' + JSON.stringify(value);
    else {
        var cookie = document.cookie.split(';');
        cookie[cookie.findIndex(c => c.indexOf('cart_waw') != -1)] = 'cart_waw=' + JSON.stringify(value);
        document.cookie = cookie.join(';');
    }
}
 
// Get cart from localStorage
if (document.cookie.indexOf('cart_waw') == -1 && localStorage.getItem('cart_waw')) {
    setCart(JSON.parse(localStorage.getItem('cart_waw')));
    if (location.pathname == '/cart') location.reload();
}