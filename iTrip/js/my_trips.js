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
        if (document.documentElement.clientWidth < 960) {
            var items = document.getElementsByClassName("resultInfo");
            for (var j = 0; j < items.length; j++) {
                items[j].style.setProperty("background-image", "url('images/placeholders/trash-43.png')");
                items[j].style.setProperty("background-repeat", "no-repeat");
            }
        } else {
            var items = document.getElementsByClassName("delitem");
            for (var j = 0; j < items.length; j++) {
                items[j].style.setProperty("visibility", "visible");
            }
        }
    } else {
        e.src = "images/placeholders/placeholders-38.png";
        e.className = "";
        var arrows = document.getElementsByClassName("arrow");
        for (var i = 0; i < arrows.length; i++) {
            arrows[i].src = "images/placeholders/placeholders-39.png";
            arrows[i].alt = "arrow icon";
        }
        if (document.documentElement.clientWidth < 960) {
            var items = document.getElementsByClassName("resultInfo");
            for (var j = 0; j < items.length; j++) {
                items[j].style.setProperty("background-image", "url('images/placeholders/placeholders-31.png')");
                items[j].style.setProperty("background-repeat", "no-repeat");
            }
        } else {
            var items = document.getElementsByClassName("delitem");
            for (var j = 0; j < items.length; j++) {
                items[j].style.setProperty("visibility", "hidden");
            }
        }
    }
}

function gotoAdd() {
    window.location = "add_item.html";
}
function gotoShared(){
    window.location = "sharedtrip.html";
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
        $(".backToSearch").css("visibility","visible");
    }
    // HELPS TO REDISTRIBUTE THE ISOTOPE ITEMS SO THEY DON'T FALL ON TOP OF EACH OTHER
    $(".isotope").isotope('layout');
}

function toTravels() {
    document.getElementById("resultSection").style.setProperty("display", "none");
    document.getElementById("searchPanel").style.setProperty("height", "100%");
    document.getElementById("searchPanel").style.setProperty("display", "initial");
    $(".backToSearch").css("visibility","hidden");
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
