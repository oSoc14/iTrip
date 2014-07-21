function startDelete(e) {
    if (e.className != "active") {
        e.src = "images/placeholders/trash-41.png";
        e.className = "active";
        var arrows = document.getElementsByClassName("arrow");
        for (var i = 0; i < arrows.length; i++) {
            arrows[i].src = "images/placeholders/trash-43.png";
            arrows[i].alt = "trashcan icon";
        }
        /*Delete images for every tripitem*/
        var items = document.getElementsByClassName("resultInfo");
        for (var j = 0; j < items.length; j++) {
            items[j].style.setProperty("background-image", "url('images/placeholders/trash-43.png')");
        }
    } else {
        e.src = "images/placeholders/placeholders-38.png";
        e.className = "";
        var arrows = document.getElementsByClassName("arrow");
        for (var i = 0; i < arrows.length; i++) {
            arrows[i].src = "images/placeholders/placeholders-39.png";
            arrows[i].alt = "arrow icon";
        }
        var items = document.getElementsByClassName("resultInfo");
        for (var j = 0; j < items.length; j++) {
            items[j].style.setProperty("background-image", "url('images/placeholders/placeholders-31.png')");
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
        document.getElementById("resultSection").style.setProperty("display", "initial");
        document.getElementById("resultSection").style.setProperty("height", "100%");
        document.getElementById("searchPanel").style.setProperty("display", "none");
    }
}

function toTravels() {
    document.getElementById("resultSection").style.setProperty("display", "none");
    document.getElementById("searchPanel").style.setProperty("height", "100%");
    document.getElementById("searchPanel").style.setProperty("display", "initial");
}

function addmenu(e) {
    var numeric = e.id.replace('add', '');
    var poi = document.getElementById("poi" + numeric);
    if (poi.style.visibility == "hidden") {
        poi.style.setProperty("visibility", "visible");
    } else {
        poi.style.setProperty("visibility", "hidden");
    }
}
