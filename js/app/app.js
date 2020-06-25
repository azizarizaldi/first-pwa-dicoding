$(function () {
    var page = window.location.hash.substr(1);

    // Load Navigation Menu
    $('.sidenav').sidenav();        
    $("#nav-main").load("main-navbar.html");
    $("#nav-mobile").load("mobile-navbar.html");

    loadPage(page);
});


$(".navigation").on("click", "li", function() {
    var link = $("a",this).attr('href');
    var page = link.substr(1);

    loadPage(page);
});

function loadPage(page="") {
    if (page == "") page = "home";
    $("#body-content").load("pages/"+page+".html");
}