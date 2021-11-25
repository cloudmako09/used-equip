import $ from "jquery";

//on page load
$(function () { 

    //smooth scrolling
    $('a[href*="#"]:not([href="#"])').click(function () {
       if ($(this).data("toggle")) return;
       if (window.location.pathname.replace(/^\//, '')===this.pathname.replace(/^\//, '') 
       && window.location.hostname === this.hostname) {
           var target = $(this.hash);
           target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
           if (target.length) {
               $('html, body').animate({
                   scrollTop: target.offset().top
               }, 200);
               //return false;
           }
       }
   });


   //close favourites popup when clicking outside
//    $("body").click(function (e) {
       
//        var elem = e.target;
//        var isFavouritesPopup=false;
//        var isFavouritesButton=false;
//        while(elem.parentNode && elem.parentNode.nodeName.toLowerCase() !== 'body') {
           
//            if (elem.className === "shopping-cart"){
//                isFavouritesPopup=true;
//                break;
//            }else{
//                elem = elem.parentNode;
//            }
//        }

//        //
//        if (e.target.parentNode.id ==="desktop-favourites-link" || e.target.parentNode.id === "cart" || e.target.id==="cart"){
//            isFavouritesButton=true;
//        } 

//        if (!isFavouritesButton && !isFavouritesPopup){
//            //if clicking outside favourites button and popup, close the popup
//            $(".shopping-cart").fadeOut("fast");
//        }

//    });

});