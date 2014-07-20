function startDelete(e) {
    if (e.className != "active") {
        e.src = "images/placeholders/trash-41.png";
        e.className = "active";
        var arrows = document.getElementsByClassName("arrow");
        for (var i = 0; i < arrows.length; i++) {
            arrows[i].src = "images/placeholders/trash-43.png";
            arrows[i].alt = "trashcan icon";
        }
    } else {
        e.src = "images/placeholders/placeholders-38.png";
        e.className = "";
        var arrows = document.getElementsByClassName("arrow");
        for (var i = 0; i < arrows.length; i++) {
            arrows[i].src = "images/placeholders/placeholders-39.png";
            arrows[i].alt = "arrow icon";
        }
    }
}

function gotoAdd() {
    window.location = "add_item.html";
}

function changeTrip(trip) {
    var articles = document.getElementsByTagName("article");
    for (var i = 0; i < articles.length; i++) {
        if (articles[i].id.indexOf("trip") == 0) {
            articles[i].className = "";
            articles[i].getElementsByTagName("img")[0].src = "images/placeholders/placeholders-29.png";
        }
    }
    trip.className = "active";
    trip.getElementsByTagName("img")[0].src = "images/placeholders/placeholders-30.png";
    if (document.documentElement.clientWidth < 960) {
        document.getElementById("resultSection").style.setProperty("display", "inherit", "important");
        document.getElementById("searchPanel").style.setProperty("display", "none", "important");
    }
}
