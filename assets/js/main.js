// === Compteurs dynamiques profil ===
const API_URL = 'https://portfolio-backend-itc9.onrender.com'; // Ton URL Render

// Récupérer les stats
function updateProfileStats() {
    fetch(API_URL + '/stats')
        .then(res => {
            if (!res.ok) throw new Error('Erreur réseau : ' + res.status);
            return res.json();
        })
        .then(data => {
            document.getElementById('profileViews').textContent = data.views;
            document.getElementById('profileShares').textContent = data.shares;
        })
        .catch(err => console.error('Erreur lors de la récupération des stats:', err));
}

// Incrémenter les vues
function incrementProfileView() {
    fetch(API_URL + '/view', { method: 'POST' })
        .then(res => {
            if (!res.ok) throw new Error('Erreur réseau : ' + res.status);
            return res.json();
        })
        .then(data => {
            document.getElementById('profileViews').textContent = data.views;
        })
        .catch(err => console.error('Erreur lors de l\'incrémentation des vues:', err));
}

// Incrémenter les partages
function incrementProfileShare() {
    fetch(API_URL + '/share', { method: 'POST' })
        .then(res => {
            if (!res.ok) throw new Error('Erreur réseau : ' + res.status);
            return res.json();
        })
        .then(data => {
            document.getElementById('profileShares').textContent = data.shares;
        })
        .catch(err => console.error('Erreur lors de l\'incrémentation des partages:', err));
}

// Gérer le clic sur le bouton de partage
function handleShare() {
    if (navigator.share) {
        // Utiliser l'API Web Share pour mobile
        navigator.share({
            title: 'Mon Portfolio',
            text: 'Découvrez mon portfolio !',
            url: window.location.href
        })
        .then(() => {
            incrementProfileShare(); // Incrémente après un partage réussi
        })
        .catch(err => console.error('Erreur de partage:', err));
    } else {
        // Fallback pour desktop : copier l'URL dans le presse-papiers
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert('Lien copié dans le presse-papiers !');
                incrementProfileShare(); // Incrémente après copie
            })
            .catch(err => console.error('Erreur lors de la copie du lien:', err));
    }
}

// Appel au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    incrementProfileView(); // Incrémente les vues à chaque visite
    updateProfileStats();   // Récupère les stats
});

// Fonction pour ré-initialiser les effets JS après l'inclusion dynamique
window.reInitEffects = function() {
    // Smooth scroll sur les liens du menu
    $('.page-scroll').off('click.smooth').on('click.smooth', function (event) {
        var target = this.hash;
        if (target && $(target).length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 1200);
        }
    });
    // Sticky
    $(window).off('scroll.sticky').on('scroll.sticky', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".header_navbar").removeClass("sticky");
        } else {
            $(".header_navbar").addClass("sticky");
        }
    });

    // Section Menu Active
    var scrollLink = $('.page-scroll');
    $(window).off('scroll.menuactive').on('scroll.menuactive', function () {
        var scrollbarLocation = $(this).scrollTop();
        scrollLink.each(function () {
            var sectionOffset = $(this.hash).offset().top - 73;
            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });

    // Navbar collapse
    $(".navbar-nav a").off('click.collapse').on('click.collapse', function () {
        $(".navbar-collapse").removeClass("show");
        $(".navbar-toggler").removeClass('active');
    });
    $(".navbar-toggler").off('click.toggler').on('click.toggler', function () {
        $(this).toggleClass("active");
    });

    // Progress Bar
    if ($('.progress_line').length) {
        $('.progress_line').appear(function () {
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent + '%');
        }, {
            accY: 0
        });
    }

    // Back to top
    $(window).off('scroll.backtotop').on('scroll.backtotop', function () {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });
    $('.back-to-top').off('click.scrolltop').on('click.scrolltop', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 1500);
    });
}

$(function () {

    "use strict";

    //===== Prealoder

    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });


  //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".header_navbar").removeClass("sticky");
        } else {
            $(".header_navbar").addClass("sticky");
        }
    });
    
    
    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });
    
    
    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });    


    ///===== Progress Bar

    if ($('.progress_line').length) {
        $('.progress_line').appear(function () {
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent + '%');
        }, {
            accY: 0
        });
    }




    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });


});
