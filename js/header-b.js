
var bodyRect;
var header_el;
var locked = false;
var sections_color;

function isNight(color) {
    var r, g, b, hsp; // Variables for red, green, blue values
    if (color.match(/^rgb/)) { // Check the format of the color, HEX or RGB?
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/); // If HEX --> store the red, green, blue values in separate variables
        r = color[1];
        g = color[2];
        b = color[3];
    }
    else { // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    hsp = Math.sqrt( // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    if (hsp > 152) { // hsp>127.5 Using the HSP value, determine whether the color is light or dark // original 185
        return false; //'day'
    }
    else {
        return true; //'night'
    }
}

function update_header(colourr) {

    header_el = $(".navbar");
    bodyRect = document.body.getBoundingClientRect();

    for (var i = 0; i < sections_color.length; i++) {
        var offset1 = sections_color[i].getBoundingClientRect().top - bodyRect.top - header_el[0].offsetHeight;
        var offset2 = sections_color[i].getBoundingClientRect().top - bodyRect.top + sections_color[i].getBoundingClientRect().height - header_el[0].offsetHeight;
        if (i < sections_color.length - 1)
            offset2 = sections_color[i + 1].getBoundingClientRect().top - bodyRect.top - header_el[0].offsetHeight;
        if ((window.scrollY >= offset1) && (window.scrollY < offset2)) {
            var new_colourr = getComputedStyle(sections_color[i], null).backgroundColor;

            if (isNight(new_colourr)) {
                $('._1991-l').addClass('night');
                $('.sb-l').addClass('night');
                $('.vertical-line').addClass('night');
            } else {
                $('._1991-l').removeClass('night');
                $('.sb-l').removeClass('night');
                $('.vertical-line').removeClass('night');
            }
            locked = false;
            break;
        }
    }
}

$(document).ready(function () {

    sections_color = document.getElementsByClassName("section");

    $(window).scroll(function () {
        if (!locked) {
            locked = true;
            setTimeout(update_header(null), 150);
        }
    });

    update_header(null);

});