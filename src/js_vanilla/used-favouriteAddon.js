import $ from "jquery/dist/jquery.slim";


// ***************************************************
// Shopping Cart functions

const shoppingCart = (function () {
    // Private methods and properties
    var cart = [];

    function Item(name, price, pic, serial, location, hours, count, linkurl) {
        this.name = name
        this.price = price
        this.pic = pic
        this.serial = serial
        this.location = location
        this.hours = hours
        this.count = count
        this.linkurl = linkurl
    }

    function saveCart() {
        try {
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
        } catch (e) { 
        }

    }

    function loadCart() {

        try {
            cart = JSON.parse(localStorage.getItem("shoppingCart"));
        } catch (e) {
            console.log(e);
        }
        if (cart === null) {
            cart = []
        }
    }

    loadCart();



    // Public methods and properties
    var obj = {};

    obj.isItemInCart = function (yr, make, model, serial) {
        //console.log("Checking cart:"+name+ ","+serial);
        var alreadyExist = false;
        const name = getCartDataAttribute(yr, make, model, serial);
        for (var i in cart) {

            if (name === cart[i].name && serial === cart[i].serial) {
                alreadyExist = true;
            }
        }
        //console.log("Found - "+alreadyExist);
        return alreadyExist;
    }

    obj.addItemToCart = function (name, price, pic, serial, location, hours, count, linkurl) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count += count;
                saveCart();
                return;
            }
        }

        //gtag('event', 'Add to favorites', {'event_category': 'Engagement', 'event_label': name});//TODO: add GA

        //console.log("addItemToCart:", name, price, pic, serial, location,hours, count,linkurl);

        var item = new Item(name, price, pic, serial, location, hours, count, linkurl);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCart = function (name) { // Removes one item
        for (var i in cart) {
            if (cart[i].name === name) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCartAll = function (name) { // removes all item name
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.clearCart = function () {
        cart = [];
        saveCart();
    }


    obj.countCart = function () { // -> return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function () { // -> return total cost
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    obj.listCart = function () { // -> array of Items
        var cartCopy = [];
        for (var i in cart) {
            // console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();

// ------------------------

// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

// }





$(document).on('click', '.add-to-cart', function (event) {

    event.preventDefault();
    var name = $(this).attr("data-name");
    var pic = $(this).attr("data-pic");
    var serial = $(this).attr("data-serial");
    var location = $(this).attr("data-location");
    var hours = $(this).attr("data-hours");
    var price = $(this).attr("data-price");
    var linkurl = $(this).attr("data-url");
    var isInCart = false;

    isInCart = shoppingCart.isItemInCart(name, serial);
    //alert(isInCart);
    //console.log("CHECKING: "+name+" / "+serial);

    if (!isInCart) {
        //console.log("ADDING TO CART");
        shoppingCart.addItemToCart(name, price, pic, serial, location, hours, 1, linkurl);
        displayCart();
        $(this).removeClass("add-to-cart");
        $(this).addClass("delete-item");
        //$(this).html("Remove from Favourites  <i class='fa fa-star' aria-hidden='true'></i>");


    } else {
        //console.log("ALREADY IN CART");
    }

    $(".shopping-cart").addClass("favesUpdated");
});




export function displayCart() {
    $(function () {
        var cartArray = shoppingCart.listCart();
        console.log("displayCart()", cartArray);
        var output = "";

        for (var i in cartArray) {

            var displayName = cartArray[i].name;
            if (displayName != null) {
                displayName = displayName.replace(/\s/g, " ");//remove nbsp
                displayName = displayName.split("S/N:")[0];//remove serial
            } else {
                continue;
            }

            var itemprice = "";
            if (typeof cartArray[i].price != "undefined" && cartArray[i].price !== "undefined") {
                itemprice = cartArray[i].price;
            } 

            output += "<span class='item-name'><table class='item-cols'><tr><td class='tdpic'>"

                + " <a href='" + cartArray[i].linkurl + "'><div class='machineCartPic' style='background-image:url(\"" + cartArray[i].pic + "\");'/></div></a>"
                + "</td><td class='tdinfo'>"
                + "<a href='" + cartArray[i].linkurl + "'><h3>" + displayName + "</h3></a>"
                // +cartArray[i].serial
                // +cartArray[i].location
                // +cartArray[i].hours

                //+" <input class='item-count' type='number' data-name='"
                //+cartArray[i].name
                //+"' value='"+cartArray[i].count+"' >"
                + " <p class='item-price'>" + itemprice + "</p>"
                //+" = "+cartArray[i].total
                //+" <button class='plus-item' data-name='"
                //+cartArray[i].name+"'>+</button>"
                // +" <button class='subtract-item' data-name='"
                // +cartArray[i].name+"'>-</button>"
                + "</td><td class='tdremove'>"
                + "<button class='delete-item' data-name='" + cartArray[i].name + "'> <i class='fa fa-trash'></i></button>"                 
                + "</span>"
                + "</td></tr></table>";
        }



        if (cartArray.length === 0) {
            $("#cartDropdownBtns").hide();
            $("#cartEmptyMsg").show();
        } else {
            $("#cartDropdownBtns").show();
            $("#cartEmptyMsg").hide();
        }

        $("#show-cart").html(output);
        $("#count-cart").html(shoppingCart.countCart());
        $(".mobile-count").html(shoppingCart.countCart());
        $("#count-cart-mobile").html(shoppingCart.countCart());
        $("#total-cart").html(shoppingCart.totalCart());
 

    });
}



//$(".delete-item").click(function(event){
// $("#show-cart").on("click", ".delete-item", function(event){
$(document).on("click", ".delete-item", function (event) {
    
    var name = $(this).attr("data-name");
    console.log("remove",name);
    //console.log("Deleting "+name);
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
    //$(".shopping-cart").fadeIn("fast");

    $(this).addClass("add-to-cart");
    $(this).removeClass("delete-item");
    //$(this).html("Favourite This Machine <i class='fa fa-star' aria-hidden='true'></i>");
});




$("#show-cart").on("click", ".subtract-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
});

$("#show-cart").on("click", ".plus-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.addItemToCart(name, 0, 1);
    displayCart();
});
$("#show-cart").on("change", ".item-count", function (event) {
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

$(document).on("click", "#clear-cart", function (event) {

    $(".btn-addremove.delete-item").each(function (i, obj) {
        $(this).addClass("add-to-cart");
        $(this).removeClass("delete-item");
        $(this).html("Favourite This Machine <i class='fa fa-star' aria-hidden='true'></i>");
    });
    $(".delete-item").addClass("add-to-cart");
    $(".delete-item").removeClass("delete-item");
    shoppingCart.clearCart();
    displayCart();
});


// function openCartInNav() {
//     $(".shopping-cart").fadeToggle("fast");
// } 

export function getCartDataAttribute(yr, make, model, sn) {
    const dataName = yr + "\u00A0" + make + "\u00A0" + model + "\u00A0S/N:" + sn;
    return dataName;
}


// //bookmark page html
// function getCartPageHtml() {
//     var cartArray = shoppingCart.listCart();
//     //console.log(cartArray);
//     var output = "";

//     for (var i in cartArray) {

//         var displayName = cartArray[i].name;
//         displayName = displayName.replace(/\s/g, " ");//remove nbsp
//         displayName = displayName.split("S/N:")[0];//remove serial

//         var displayPrice = cartArray[i].price;
//         if (Number(cartArray[i].price) > 0) {
//             displayPrice = "$" + displayPrice;
//         }


//         output += '<div class="cartlisting row"><div class="col-xs-12"><h1 class="displayTitle">' + displayName + '</h1></div>'
//             + '<div id="col-image" class="col-xs-12 col-sm-4 col-md-4">'
//             + '<img  src="' + cartArray[i].pic + '"  /> </div>'
//             + '<div id="col-specs" class="col-xs-12 col-sm-4 col-md-4"><div class="printleft">'
//             + '  <table class="printspecs">'
//             + '    <tr> '
//             + '<td><p class="specname">Serial Number: </p></td>'
//             + '   <td><p>' + cartArray[i].serial + '</p></td>'
//             + '</tr> <tr>'
//             + ' <td><p class="specname">Hours:</p></td>'
//             + ' <td><p>' + cartArray[i].hours + '</p></td>'
//             + ' </tr>        <tr>'
//             + ' <td><p class="specname">Location:</p></td>'
//             + ' <td><p>' + cartArray[i].location + ' </p></td>'
//             + ' </tr>        <tr>'
//             + ' <td colspan="2"><p><a class="btn btn-default details-btn" href="' + cartArray[i].linkurl + '"> View details &raquo; </a> </p></td>'

//             + '	</tr>	  </table> </div> </div>'

//             + ' <div id="col-contact" class="col-xs-12 col-sm-4 col-md-4">'
//             + '  <div class="printright">'
//             + '  <h2><img src="shared/images/flag_ca.png"> &nbsp;' + displayPrice + ' </h2>'
//             + '  <div class="contact-phone-block">'
//             + '   <p><b>Financing Options Available</b></p>'
//             + '</div><div class="contact-phone-block"><p><b>Inquire about our Warranty Options</b></p> </div>'
//             + '<div class="contact-phone-block"> <p><b> Premium Used</b></p>    </div></div></div></div>';
//     }


//     if (cartArray.length === 0) {
//         $("#bookmarkedhtml").html("<p>You have not added any machines to your favourites list.</p>");
//     } else {
//         $("#bookmarkedhtml").html(output);
//     }
// }




// $(function () {
//     //initialize cart feature
//     displayCart();

// });
shoppingCart.whyDidYouRender = true;
export default shoppingCart;