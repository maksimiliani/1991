var figs = [];

    $( document ).ready(function() {
        $("#rec312119903").append($('<div class="addgif01"></div>'));
        $("#rec312119903").append($('<div class="addgif02"></div>'));
        $("#rec312119903").append($('<div class="addgif03"></div>'));
        $("#rec312119903").append($('<div class="addgif04"></div>'));
        $("#rec312119903").append($('<div class="addgif05"></div>'));
        $("#rec312119903").append($('<div class="addgif06"></div>'));

        figs.push({top: $('.addgif01')[0].getBoundingClientRect().top, left: $('.addgif01')[0].getBoundingClientRect().left});
        figs.push({top: $('.addgif02')[0].getBoundingClientRect().top, left: $('.addgif02')[0].getBoundingClientRect().left});
        figs.push({top: $('.addgif03')[0].getBoundingClientRect().top, right: $('.addgif03')[0].getBoundingClientRect().right});
        figs.push({top: $('.addgif04')[0].getBoundingClientRect().top, left: $('.addgif04')[0].getBoundingClientRect().left});
        figs.push({top: $('.addgif05')[0].getBoundingClientRect().top, left: $('.addgif05')[0].getBoundingClientRect().left});
        figs.push({top: $('.addgif06')[0].getBoundingClientRect().top, left: $('.addgif06')[0].getBoundingClientRect().left});

        function tapHandler01( event ){
            $(".addgif01").css({top: (Math.random() - 0.5)*10 + figs[0].top/$("#rec192970385").height() + '%', left: (Math.random() - 0.5)*10 + figs[0].left/$(window).width() + '%'});
        }
        function tapHandler02( event ){
            $(".addgif02").css({top: (Math.random() - 0.5)*5 + figs[1].top/$("#rec192970385").height() + '%', left: (Math.random() - 0.5)*15 + figs[1].left/$(window).width() + '%'});
        }
        function tapHandler03( event ){
            $(".addgif03").css({top: (Math.random() - 0.5)*15 + figs[2].top/$("#rec192970385").height() + '%', right: (Math.random() - 0.5)*15 + figs[2].right/$(window).width() + '%'});
        }
        function tapHandler04( event ){
            $(".addgif04").css({top: (Math.random() - 0.5)*15 + figs[3].top/$("#rec192970385").height() + '%', left: (Math.random() - 0.5)*20 + figs[3].left/$(window).width() + '%'});
        }
        function tapHandler05( event ){
            $(".addgif05").css({top: Math.random()*$("#rec312119903").height()*0.33, left: Math.random()*$(window).width()*0.66});
        }
        function tapHandler06( event ){
            $(".addgif06").css({top: Math.random()*$("#rec312119903").height()*0.33 + $("#rec192970385").height()/2, left: Math.random()*$(window).width()*0.66});
        }

        $('.addgif01').on('click mouseover', tapHandler01);
        $('.addgif02').on('click mouseover', tapHandler02);
        $('.addgif03').on('click mouseover', tapHandler03);
        $('.addgif04').on('click mouseover', tapHandler04);
        $('.addgif05').on('click mouseover', tapHandler05);
        $('.addgif06').on('click mouseover', tapHandler06);

        $('.addgif01').on( "vclick", "p", tapHandler01);
        $('.addgif02').on( "vclick", "p", tapHandler02);
        $('.addgif03').on( "vclick", "p", tapHandler03);
        $('.addgif04').on( "vclick", "p", tapHandler04);
        $('.addgif05').on( "vclick", "p", tapHandler05);
        $('.addgif06').on( "vclick", "p", tapHandler06);

        setTimeout(()=> { update_figs() }, 2000);
        function update_figs() {
            console.log ("opacity");
            $(".addgif01").css({opacity: 1});
            $(".addgif02").css({opacity: 1});
            $(".addgif03").css({opacity: 1});
            $(".addgif04").css({opacity: 1});
            $(".addgif05").css({opacity: 1});
            $(".addgif06").css({opacity: 1});
        }
    });
