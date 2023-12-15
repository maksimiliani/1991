var all_existing_donors = [];
var all_existing_industries = [];


function check_presence(elem, array = all_existing_donors) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == elem) return true;
    }
    return false;
}

document.addEventListener("DOMContentLoaded", (event) => {
    const donor_tag = document.getElementsByClassName("donor-tag");
    const industry_tag = document.getElementsByClassName("industry-tag");
    for (var i=0; i < donor_tag.length; i++) {
      let text_el = donor_tag[i].textContent;
      if (text_el == '') continue;
      let val_el = text_el.toLowerCase().split(' ').join('-');
      if (!check_presence(text_el)) {
        all_existing_donors.push(text_el);

        let opt = document.createElement('option');
            opt.value = val_el;
            opt.innerHTML = text_el;
        document.querySelector('#donor-dd').appendChild(opt);
      }
    }

    for (var i=0; i < industry_tag.length; i++) {
      let text_el = industry_tag[i].textContent;
      if (text_el == '') continue;
      let val_el = text_el.toLowerCase().split(' ').join('-');
      if (!check_presence(text_el, all_existing_industries)) {
        all_existing_industries.push(text_el);

        let opt = document.createElement('option');
            opt.value = val_el;
            opt.innerHTML = text_el;
        document.querySelector('#industry-dd').appendChild(opt);
      }
    }

    document.querySelectorAll('.industry-tag').forEach((element) => {
        if(element.textContent != '') {
            element.parentElement.parentElement.parentElement.parentElement.classList.add(element.textContent.toLowerCase().split(' ').join('-'));
        }
    });

    document.querySelectorAll('.donor-tag').forEach((element) => {
      if(element.textContent != '') {
          element.parentElement.classList.add(element.textContent.toLowerCase().split(' ').join('-'));
      }
    });

    let donorFilter;
    let industryFilter;
  
    // init Isotope
    const $grid = $('#grid').isotope({
        layoutMode: 'fitRows',
        itemSelector: '.collection-item',
        stagger: 30,
            filter: function() {
            var $this = $(this);
//            var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
            var typeResult = donorFilter ? $this.is( donorFilter ) : true;
            var industryResult = industryFilter ? $this.is( industryFilter ) : true;
            return industryResult && typeResult;
          }
    });
  
    // reveal all items after init
    const $items = $grid.find('.collection-item');
    $grid.addClass('is-showing-items').isotope( 'revealItemElements', $items );
  
    $("#donor-dd").change(function(){
        donorFilter = document.querySelector('#donor-dd').value;
        if (donorFilter == '') {
          $grid.isotope({filter: '.collection-item'});
        } else {
          $grid.isotope();
        }
     });

     $("#industry-dd").change(function(){
      industryFilter = document.querySelector('#industry-dd').value;
      if (industryFilter == '') {
        $grid.isotope({filter: '.collection-item'});
      } else {
        $grid.isotope();
      }
   });
});
/*



    // quick search regex
    let qsRegex;
    let donorFilter;
    let catFilter;
  
    // init Isotope
    const $grid = document.querySelector('#grid').isotope({
        layoutMode: 'fitRows',
        itemSelector: '.w-dyn-item',
        stagger: 30,
            filter: function() {
            var $this = this;
            var donorResult = donorFilter ? $this.is( donorFilter ) : true;
            return donorResult;
          }
    });
  
    // reveal all items after init
    const $items = document.querySelector('#grid').querySelectorAll('.w-dyn-item');
    $grid.classList.add('is-showing-items').isotope( 'revealItemElements', $items );

    document.querySelector('#donor-dd').onchange = function() {
        donorFilter = document.querySelector('#donor-dd').value;
        $grid.isotope();
    };


// document ready wrapper
$(document).ready( function() {

    // find all filter buttons
    var all_existing_types = [];
  
    const type_elements = document.getElementsByClassName("type_name");
    for (var i=0; i < type_elements.length; i++) {
      let type_el = type_elements[i].textContent;
      if($.inArray(type_el, all_existing_types) === -1) {
        var newVal = type_el.toLowerCase().replace(' ', '-');
          all_existing_types.push(type_el);
        $('#field_type').append($('<option>', {value: "."+newVal, text: type_el}));
      }
    }
  
    // go over all collection item category label elems
    $('.w-dyn-item .type_name').each(function(index, element) {
            var _this = $( element );
        // lowercase, hyphenate and add as a class to dyn-item for isotope filtering
            _this.parent().parent().addClass( _this.text().toLowerCase().replace(' ', '-'));
    });
  
  
    // quick search regex
    let qsRegex;
    let typeFilter;
    let catFilter;
  
    // init Isotope
    const $grid = $('#grid').isotope({
        layoutMode: 'fitRows',
        itemSelector: '.w-dyn-item',
        stagger: 30,
            filter: function() {
            var $this = $(this);
            var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
            var typeResult = typeFilter ? $this.is( typeFilter ) : true;
            return searchResult && typeResult;
          }
    });
  
    // reveal all items after init
    const $items = $grid.find('.w-dyn-item');
    $grid.addClass('is-showing-items').isotope( 'revealItemElements', $items );
  
    $("#field_type").change(function(){
         typeFilter = $(this).children("option:selected").val();
         $grid.isotope();
     });
  
    // use value of search field to filter
    const $quicksearch = $('#quicksearch').keyup(debounce(function() {
      qsRegex = new RegExp($quicksearch.val(),'gi');
      $grid.isotope();
    }));
  
  
    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        let timeout;
        return function debounced() {
          if ( timeout ) {
            clearTimeout( timeout );
          }
          function delayed() {
            fn();
            timeout = null;
          }
          setTimeout( delayed, threshold || 100 );
        };
    };
  
  
    // disable search from submitting
    $('#quicksearch').on('keyup keypress', function(e) {
      const keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });
  
  });
  */