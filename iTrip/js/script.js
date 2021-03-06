$(document).ready( function (){

  // TEMPORARY LINK TO NEXT RESULTS PAGE WHEN CLICKED ON SEARCH
  $(".searchTrip").on('click', function(e){
    window.location.href = "results.html";
    e.preventDefault();
  });

  // TEMPORARY LINK TO PREVIOUS PAGE (HOME PAGE) WHEN "ZOEKOPDRACHT WIJZIGEN" IS CLICKED
  $(".editTrip").on('click', function(e){
    window.location.href = "index.html";
    e.preventDefault();
  });

    // INITIALIZE THE WELCOME BOX, WHICH WILL ONLY APPEAR THE FIRST TIME A USER VISITS THE SITE
  initializeWelcomeBox();


  // WHEN CLICKED ON THE OVERLAY DIV, THE VISIBLE BOXES DISAPPEAR AND THIS WILL BE SAVED IN A COOKIE
  // IF COOKIES ARE ENABLED
  $(".overlay").on('click', function (event){
    checkIfWelcomeBoxMustShow();
    if($(".loginBox").css("display","block"))
      $(".loginBox").fadeOut(300, function(){  $(".overlay").fadeOut();$(this).remove(); });
    if($(".registerBox").css("display","block"))
      $(".registerBox").fadeOut(300, function(){  $(".overlay").fadeOut();$(this).remove(); });
    // $(".overlay").fadeOut();
  });

  // WHEN CLICKED ON THE CLOSE BUTTON OF THE WELCOMEBOX, THIS WILL BE SAVED IN A COOKIE IF COOKIES ARE ENABLED
  // SO IT WILL NOT APPEAR THE NEXT TIME YOU VISIT THE SITE
   $("body").on('click', 'span#closeImage', function (event){
    checkIfWelcomeBoxMustShow();
  });

  // WHEN CLICKED ON THE CLOSE BUTTON OF THE WELCOMEBOX, THIS WILL BE SAVED IN A COOKIE IF COOKIES ARE ENABLED
  // SO IT WILL NOT APPEAR THE NEXT TIME YOU VISIT THE SITE
  $("#planTripButton").on('click', function (event){
    checkIfWelcomeBoxMustShow();
  });




  // SHOW THE LOGIN POPUP
  login();

  // FUNCTION TO LOG OUT
  logout();

  // SHOW REGISTERBOX
  showRegisterBox();

  // FUNCTION TO REGISTER A USER
  register();

  // FUNCTION TO REMOVE THE LOGINBOX 
  removeLoginBoxBox();

  // FUNCTION TO REMOVE THE REGISTERBOX
  removeBoxRegisterBox();
  
  //WHEN CLICKED ON A NAVIGATIONAL LINK, THAT LINK CHANGES COLOR (IS ACTIVE)
  changeActiveMenuLink();

  // SEARCH FOR YOUR CURRENT LOCATION AND UPDATE THE GOOGLE MAP AND INPUT FIELD
  searchForCurrentLocation();

  // SEARCH FOR A CUSTOM LOCATION AND UPDATE THE GOOGLE MAP AND INPUT FIELD
  searchForCustomLocation();

  // FUNCTION TO SWITCH CATEGORIES ON THE RESULT PAGE
  switchCategory();

  // FUNCTION TO RENAME YOUR TRIP
  editTripName();

  //FUNCTION CALLED WHEN CLICKED ON THE 'HAMBURGER' ICON
  showMobileNavigation();

  // FUNCTION CALLED WHEN CLICKED AN A RESULT
  // THE DETAILS APPEAR AND ALL THE RESULTS DISSAPPEAR
  //showResultDetail();

  // FUNCTION CALLED WHEN THE WINDOW IS RESIZED
  checkWidthWindowOnResize();

    //  $(window).trigger('resize');
  // FUCNTION TO ENABLE ISOTOPE
  // FUCTION CALLED WHILE TYPING IN THE INPUTFIELD TO SEARCH FOR EVENT
  loadIsotopeForResults();

  // FUNCTION TO LOAD ISOTOPE FOR RESULTDETAIL
  //loadIsotopeForResultDetail();

  // REMOVE THE OVERLAY AND WELCOMEBOX WHEN THE OVERLAY ITSELF OR THE CLOSEBUTTON IS CLICKED
  //overlayLoseFocus();

  // PREPARE ARRAY WITH ALL THE MONTHS IN STRINGS TO FORMAT THE SELECTED DATE IN THE DATEPICKER
  var dutchMonths = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
  var englishMonths = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
  var frenchMonths = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  var germanMonths = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

  // GET RIGHT MONTH IN RIGHT LANGUAGE = INDEX 0 = DUTCH, INDEX 1 = ENGLISH,...
  var months = [["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
                [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ],
                ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
                ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]];

  // DEFINE A SLIDER TO SELECT A RADIUS TO SEARCH FOR A TOWN
  var slider = $( "#slider" ).slider({
      min: 0,
      max: 100,
      step: 5,
      range: "min",
      value: 25,//parseInt($( "#radiusValue" ).text()),//select[ 0 ].selectedIndex + 1,
      slide: function( event, ui ) {
        parseInt($( "#radiusValue" ).text())
        $( "#radiusValue" ).html(ui.value);
      }
  });


  // CREATE 2 DATEPICKERS TO SELECT A DEPARTURE DAY AND A RETURN DAY
  $("#fromCalendar").datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: new Date(2010, 1 - 1, 1),
      dateFormat: 'dd-mm-yy',
      showOn: 'both', 
      buttonText: "",
     /* buttonImage: 'images/calendar.png', 
      buttonImageOnly: true,*/
      showOptions: { direction: "up" },
      onSelect: function(date) {
        // STANDARD THE MONTH WILL BE SELECTED IN DUTCH, WHEN SELECTING ANOTHER LANGUAGE ON THE WEBPAGE
        // THE LANGUAGE OF THE MONTH WILL HAVE TO CHANGE TOO
          var selectedDate = $(this).datepicker('getDate');
          var selectedDay = selectedDate.getDate();
          var selectedMonth = months[0][selectedDate.getMonth()];
          var formattedDate = selectedDay + " " + selectedMonth ;
          $("#fromWrapper").find(".ui-datepicker-trigger").text(checkDate(selectedDay));
          $("#fromWrapper").find(".ui-datepicker-trigger").css("padding","18px 3px 0px 3px");
          $("#selectedFromMonth").text(checkDate(selectedMonth));
      }
  });

  $("#toCalendar").datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: new Date(2010, 1 - 1, 1),
        dateFormat: 'dd-mm-yy',
        showOn: 'both',  
        buttonText: "",
        showOptions: { direction: "up" },
        onSelect: function(date) {
        // STANDARD THE MONTH WILL BE SELECTED IN DUTCH, WHEN SELECTING ANOTHER LANGUAGE ON THE WEBPAGE
        // THE LANGUAGE OF THE MONTH WILL HAVE TO CHANGE TOO
          var selectedDate = $(this).datepicker('getDate');
          var selectedDay = selectedDate.getDate();
          var selectedMonth = months[0][selectedDate.getMonth()];
          var formattedDate = selectedDay + " " + selectedMonth ;
          $("#toWrapper").find(".ui-datepicker-trigger").text(checkDate(selectedDay));
          $("#toWrapper").find(".ui-datepicker-trigger").css("padding","18px 3px 0px 3px");
          $("#selectedFromMonth").text(checkDate(selectedMonth));
      }
  });


 // SET THE DEFAULT FROM AND TO DATE TO TODAY AND TOMORROW
  var now = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  $("#fromWrapper").find(".ui-datepicker-trigger").text(checkDate(now.getDate()));
  $("#toWrapper").find(".ui-datepicker-trigger").text(checkDate(tomorrow.getDate()));
  $("#fromWrapper").find(".ui-datepicker-trigger").css("padding","18px 3px 0px 3px");
  $("#toWrapper").find(".ui-datepicker-trigger").css("padding","18px 3px 0px 3px");
  $("#selectedFromMonth").text(checkDate(months[0][now.getMonth()]));
  $("#selectedToMonth").text(checkDate(months[0][tomorrow.getMonth()]));

  // CALL THE REQUESTCURRENTPOSITION TO GET THE CURRENT LOCATION OF THE USER
   requestCurrentPosition();

   var useLonLat = false;
  google.maps.event.addDomListener(window, 'load', initialize(0, 0,useLonLat));

  
});

// GET THE CURRENT LOCATION OF THE USER
function requestCurrentPosition() 
{ 
  if (navigator.geolocation) 
  { 
    navigator.geolocation.getCurrentPosition(useGeoData);
  } 
  else
  {
    console.log("Geolocation is not supported by this browser.");
  } 
}


// THE FUNCTION USED BY requestCurrentPosition
function useGeoData(position) 
{ 
  var longitude = position.coords.longitude; 
  var latitude = position.coords.latitude; 
  var useLonLat = true;
  initialize(longitude, latitude, useLonLat) 
}

// SHOW ERROR WHEN NO LOCATION IS SHARED --> RESULT IN DEFAULT LOCATION
// INITIALIZING THE GOOGLE MAP ON THE HOMEPAGE
function initialize(longitude, latitude, useLonLat) 
{

  var chosenLocLatitude;
  var chosenLocLongitude;
  var geocoder;

  var currentPage = window.location.pathname.split("/")[2];
  var enableZoomScroll = true;
    if(currentPage == "my_trips.html" || currentPage == "results.html" || currentPage == "add_item.html")
      enableZoomScroll = false;
  // IF THE USER SHARED HIS LOCATION, THEN THOSE COORDINATES ARE PASSED TO THE GOOGLE MAP
  // OTHERWISE JUST THE STANDARD COORDINATES OF OSTEND ARE USED
  if(useLonLat)
  {
    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(latitude, longitude),
      scrollwheel: enableZoomScroll
    };

    chosenLocLatitude = latitude;
    chosenLocLongitude = longitude;
  }
  else
  {
    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(51.200000, 2.900000)
    };

    chosenLocLatitude = 51.200000;
    chosenLocLongitude = 2.900000;
  }
  // THEN THE MAP IS CREATED
  // WITH THE PROPER COORDINATES AND CUSTOM MARKER
  // THE GEOCODER IS USED TO RETRIEVE THE NAME OF THE CURRENT LOCATION (EX.: KORTRIJK)
    geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById('searchMap'),
        mapOptions);

    var myLatLng = new google.maps.LatLng(chosenLocLatitude, chosenLocLongitude);
    var pinShadow = new google.maps.MarkerImage(
      "images/icon-11.png",
      null,
      null,
      /* Offset x axis 33% of overall size, Offset y axis 100% of overall size */
      new google.maps.Point(10, 60), 
      new google.maps.Size(29, 39)
    ); 


  // THE GOOGLE MAP ALSO HAS A CUSTOM STYLE
    var mapStyles = [ {
                         "featureType": "road",
                         "elementType": "labels",
                         "stylers": [
                           { "visibility": "off" }
                         ]
                       },{
                         "featureType": "poi",
                         "elementType": "labels",
                         "stylers": [
                           { "visibility": "off" }
                         ]
                       },{
                         "featureType": "transit",
                         "elementType": "labels",
                         "stylers": [
                           { "visibility": "off" }
                         ]
                       },{
                         "featureType": "landscape",
                         "elementType": "labels",
                         "stylers": [
                           { "visibility": "off" }
                         ]
                       },{
                         "featureType": "water",
                         "elementType": "labels",
                         "stylers": [
                           { "visibility": "off" }
                         ]
                       },{
                         "featureType": "road",
                         "elementType": "geometry",
                         "stylers": [
                           { "visibility": "simplified" },
                           { "color": "#EBD18F" }
                         ]
                       },{
                         "featureType": "transit",
                         "stylers": [
                           { "visibility": "off" }
                         ]
                       },{
                         "featureType": "landscape",
                         "stylers": [
                           { "visibility": "simplified" }
                         ]
                       },{
                         "featureType": "landscape",
                         "elementType": "geometry",
                         "stylers": [
                           { "visibility": "on" },
                           { "color": "#F2EDC0" }
                         ]
                       },{
                         "featureType": "poi",
                         "elementType": "geometry",
                         "stylers": [
                           { "visibility": "simplified" },
                           { "color": "#F9E19F" }
                         ]
                       },{
                         "featureType": "water",
                         "elementType": "geometry",
                         "stylers": [
                           { "color": "#65A1FF" }
                         ]
                       }
                      ];

    // SETTING THE CUSTOM STYLE OF THE GOOGLE MAP, WITH CUSTOM MARKER
    map.setOptions({styles: mapStyles});
    var customMarker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: pinShadow
      });    

    // THEN THE GEOCODER IS CALLED
     var latlng = new google.maps.LatLng(chosenLocLatitude, chosenLocLongitude);
     geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(11);
          marker = customMarker;
          //console.log(results[1].address_components[1].long_name);
          // IF THE CHOSENCOORDINATES ARE THE DEFAULT ONES THAN THE CITY
          // IS ON ANOTHER INDEX OF THE RESULTS ARRAY
          if(chosenLocLatitude == 51.200000 && chosenLocLongitude == 2.900000)
            $("#customLocation").val(results[1].address_components[0].long_name);
          else
            $("#customLocation").val(results[1].address_components[1].long_name);
          //console.log(results);
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
}

  // ADD A 0 TO THE NUMBER OF A DAY IF THAT NUMBER IS LESS THAN 10
function checkDate(p_dateElement)
{
    if(p_dateElement < 10)
        p_dateElement = "0" + p_dateElement;
    return p_dateElement;
}

  // WHEN PRESSING A LINK IN THE NAVIGATION, THE CLICKED LINK IS GIVEN A CLASS TO INDICATE
  // THAT THE CURRENT PAGE/SECTION IS ACTIVE
function changeActiveMenuLink()
{
  $("nav.navigation a").on('click', function (event){
    //console.log($(this).text());
   // $(".activePage").text($(this).text());
    if($(this)[0].id == "loginInLink")
      {

        $(".overlay").fadeIn(300);
        appendLoginBox();
        login();
      } 
    $.each( $("nav.navigation a"), function( key, value ) {
      $(this).removeClass("active");
    });
    
    $(this).addClass("active");
  });
}

  // WHEN THE BUTTON TO REQUEST YOUR CURRENT LOCATION IS PRESSED
  // THE GOOGLE MAP SHOW YOUR CURRENT LOCATION AND THIS LOCATION IS ALSO
  // INSERTED INTO THE INPUT FIELD IN ORDER TO SAVE THIS LOCATION LATER ON
function searchForCurrentLocation()
{
  $("#submitCurrentLocation").on('click', function(event){
    requestCurrentPosition();
  });
}

  // WHEN THE BUTTON TO REQUEST YOUR CURRENT LOCATION IS PRESSED
  // THE GOOGLE MAP SHOW YOUR CURRENT LOCATION AND THIS LOCATION IS ALSO
  // INSERTED INTO THE INPUT FIELD IN ORDER TO SAVE THIS LOCATION LATER ON
function searchForCustomLocation()
{
  $("#submitCustomLocation").on('click', function(event){
    var address = $("#customLocation").val();
      setLocationOnMap(address);
  });

/*  var currentPage = window.location.pathname.split("/")[2];
  if(currentPage == "results.html")
  {
    var street = $("p.street").text();
    var city = $("p.city").text();
    var address = city + ", " + street;
    setLocationOnMap(address);
    //if($(".isotope").css("display") == "none")
    //$(".searchExtraStyle ").css("right","-23px");
  }*/
}

  // REMOVE THE OVERLAY AND LOGIN WHEN THE CLOSEBUTTON IS CLICKED
function removeLoginBoxBox()
{
  $("body").on('click', 'span#closeLoginImage', function (event){
    $(".loginBox").fadeOut(300, function(){  $(".overlay").fadeOut();$(this).remove(); });
  });
}

  // REMOVE THE OVERLAY AND REGISTERBOX WHEN THE CLOSEBUTTON IS CLICKED
function removeBoxRegisterBox()
{
  $("body").on('click', 'span#closeRegisterImage', function (event){
    $(".registerBox").fadeOut(300, function(){  $(".overlay").fadeOut();$(this).remove();});
  });
}

  // INITIALIZE THE WELCOME BOX, WHICH WILL ONLY APPEAR THE FIRST TIME A USER VISITS THE SITE
  // FUNCTION TO SAVE IF A USER HAS CHOSEN TO CLOSE THE WELCOMEBOX,
  // SO THAT THIS POPUP DOESN'T SHOW EVERYTIME A USER VISITS THE SITE
function initializeWelcomeBox()
{

   var cookisEnabled = cookiesAreEnabled();
  if(cookisEnabled)
    {
      var CookieSet = $.cookie('iTripAccount');
      $.cookie.json = true;

      var showWelcomeBox  = true;

       if (CookieSet == null) 
        {
            appendWelcomeBox();
            var settings =  { settings : {"welcomeEnabled" : true}};// true
            $.cookie("iTripAccount", settings, { expires: 365 });
        }
        else
        {
          var cookie = $.cookie("iTripAccount");
        //  var settings =  { settings : {"welcomeEnabled" : showTheWelcomeBox}};// false
       //   $.cookie("iTripAccount", settings, { expires: 365 });
          var welComeBoxEnabled = cookie.settings.welcomeEnabled;
          showWelcomeBox = welComeBoxEnabled;
          if(showWelcomeBox)
            appendWelcomeBox();
          else
          {
              $(".overlay").fadeOut(300);
              $(".welcomeBox").fadeOut(300, function(){ $(this).remove();});
          }
        }
    }
    else
    {
      appendWelcomeBox();
    }

}

// FUNTION CHECK COOKIE WHEN USER CLICKS TO CLOSE TO WELCOMEBOX
function checkIfWelcomeBoxMustShow()
{

 var cookisEnabled = cookiesAreEnabled();
  if(cookisEnabled)
    {
      var CookieSet = $.cookie('iTripAccount');
      $.cookie.json = true;

      var showWelcomeBox  = true;

       if (CookieSet == null) 
        {
            var settings =  { settings : {"welcomeEnabled" : false}};
            $.cookie("iTripAccount", settings, { expires: 365 });
            /*$(".overlay").fadeOut();*/
            $(".welcomeBox").fadeOut(300, function(){ $(this).remove();$(".overlay").fadeOut();});
        }
        else
        {
          var cookie = $.cookie("iTripAccount");
          var settings =  { settings : {"welcomeEnabled" : false}};
          $.cookie("iTripAccount", settings, { expires: 365 });
          /*$(".overlay").fadeOut();*/
          $(".welcomeBox").fadeOut(300, function(){ $(this).remove();$(".overlay").fadeOut();});
        }
    }
    else
    {
      appendWelcomeBox();
    }
}

// FUNCTION CALLED TO APPEND THE WELCOMEBOX ON THE HOMEPAGE
function appendWelcomeBox()
{
    var welcomeBox = "<div class='welcomeBox'>"
                   +"<div class='row'>"
                   +"     <div class='col-md-10 col-md-offset-1'>"
                   +"         <span title='close' id='closeImage'></span>"
                   +"         <h1>Welkom bij iTrip</h1>"
                   +"         <p>Plan je trip op voorhand of maak tijdens je reis gebruik van onze handige tool. Zo tonen we je de leukste activiteiten, interessantste musea en heerlijke restaurantjes en hotels.</p>"
                   +"         <strong>Kortom, beleef een zorgeloze reis!</strong>"
                   +"         <input title='Plan je reis' id='planTripButton' type='button' value='Ontdek iTrip'>"
                   +"         <p class='extraInfo'>Opslaan kan enkel indien <a href=''>aangemeld</a></p>"
                   +"         <div class='downloadApp'>"
                   +"             <a id='iphoneApp' target='_blank' title='download app for iPhone' href='https://itunes.apple.com/nl/app/itrip-coast/id660310219?mt=8'>download for iPhone</a>"
                   +"             <a id='androidApp' target='_blank' title='download app for Android' href='https://play.google.com/store/apps/details?id=be.westtoer.itrip'>download for Android</a>"
                   +"         </div>"
                   +"     </div>"
                   +" <div class='col-md-1'></div>"
                   +" </div>"
                +"</div>";

    $(".overlay").css("display", "block");
    /*$("#searchTripPart").append(welcomeBox);*/
    /*$("body").append(welcomeBox);*/
    $("body").prepend(welcomeBox);
}


// FUNCTION TO CHECK IF COOKIES ARE ENABLED
function cookiesAreEnabled()
{
  if (navigator.cookieEnabled === true)
    return true;
  else
    return false;
}

// FUNCTION CALLED TO LOGOUT
function logout()
{
  $("a#logoutLink").on('click', function (event){
    window.location.href = "index.html";
   
  });
}

// FUNCTION THAT SHOWS A REGISTERBOX IF THE USER PRESSES THE BUTTON "REGISTREER"
// IT ALSO SHOW AN ERROR WHEN NONE OF THE REQUIRED FIELDS ARE FILLED IN CORRECTLY
function register()
{
    $("body").on('click', '#registerUserButton', function(event){
        var email = $("#registerUsername").val();
        var password = $("#registerUserPassword").val();
        var repeatPassword = $("#registerUserRepeatPassword").val();

        // HERE THE EMAIL, PASSWORD AND THE REPEATEDPASSWORD ARE CHECKED IF THEY ARE NOT EMPTY
        // WHEN THEY ARE NOT EMPTY, THEY HAVE TO BE CHECKED SO NO DUPLICATE USERS ARE INSERTED INTO THE DATABASE
        // WHEN THEY ARE UNIQUE, THEN THE PASSWORD AND THE REPEATED PASSWORD HAVE TO BE CHECKED TO SEE IF THEY MATCH
        if(email != "" && password != "" && repeatPassword != "")
        {
          // CHECK HERE IF THEY ARE NOT DUPLICATES
          if(password != repeatPassword)
          {
            $(".errorMessage").css('display','block');
            $(".errorMessage").text("Je wachtwoorden komen niet overeen!");
          }
          else
          {
            $(".errorMessage").css('display','none');
            $(".errorMessage").text("");
            $(".registerBox").fadeOut(300, function(){ $(this).remove();});
          }
        }
        else
        {

            $(".errorMessage").css('display','block');
            $(".errorMessage").text("Alle velden moeten worden ingevuld!");
        }
    });
}

// FUNCTION TO SHOW THE REGISTERBOX
function showRegisterBox()
{
    $("body").on('click', '#registerButton', function(){
      $(".loginBox").fadeOut(300, function(){ $(this).remove();});
      $(".overlay").fadeIn(300);
      appendRegisterBox();
    });
}

// FUNCTION CALLED TO LOG IN
function login()
{
  $("body").on('click', '#loginButton', function(event){
    var email = $("#userUsername").val();
    var password = $("#userPassword").val();
    // THIS IS WERE THE USERNAME AND PASSWORD HAVE TO BE CHECKED WITH
    // THE CREDENTIALS IN THE DATABASE
    // FOR TESTING PURPOSES THE ACCAPTED USERNAME AND PASSWORD ARE EMPTY
   /* if(email != "" && password != "")
    {*/
      if(email == "" && password == "")
      {
        $(".errorMessage").css('display','none');
        $(".errorMessage").text(""); 
        $(".loginBox").fadeOut(300, function(){ $(this).remove();});
        window.location.href = "my_trips.html";
      }
      else
      {
        $(".errorMessage").css('display','block');
        $(".errorMessage").text("Je e-mail en wachtwoord zijn niet corrent!");
      }
/*    }
    else
    {
      $(".errorMessage").css('display','block');
      $(".errorMessage").text("Alle velden moeten worden ingevuld!");
    }*/
  });
}

// FUNCTION CALLED TO APPEND THE LOGINBOX WHEN THE USER IS NOT LOGGED IN
function appendLoginBox()
{
      var loginBox  =  "<div class='loginBox'>"
                       + "<div class='row'>"
                       + "     <div class='col-md-10 col-md-offset-1'>"
                       + "         <span id='closeLoginImage'></span>"
                       + "         <h1>Aanmelden</h1>"
                       + "         <div class='row formGroup'>"
                      // + "                 <label for='username'>E-mail</label>"
                       + "                 <input placeholder='E-mail' name='username' type='text' id='userUsername'>"
                     //  + "                 <label for='password'>Wachtwoord</label>"
                       + "                 <input placeholder='Wachtwoord' name='password' type='password' id='userPassword'>"
                       + "                 <input title='login' id='loginButton' type='button' value='Aanmelden'>"
                      // + "                 <p>of</p>"
                       + "                 <input title='register' id='registerButton' type='button' value='Registreer'>"
                       + "                 <p class='errorMessage'></p>"
                       + "         </div>"
                       + "     </div>"
                       + "     <div class='col-md-1'></div>"
                       + " </div>"
                   + " </div>";
    $(".overlay").css("display", "block");
    /*$("#searchTripPart").append(loginBox);*/
   /* $("body").append(loginBox);*/
   $("body").prepend(loginBox);
}

// FUNCTION CALLED TO APPEND THE LOGINBOX WHEN THE USER IS NOT LOGGED IN
function appendRegisterBox()
{
      var registerBox  =  "<div class='registerBox'>"
                       + "<div class='row'>"
                       + "     <div class='col-md-10 col-md-offset-1'>"
                       + "         <span id='closeRegisterImage'></span>"
                       + "         <h1>Registreer</h1>"
                       + "         <div class='row formGroup'>"
                     //  + "                 <label for='username'>E-mail</label>"
                     //  + "                 <label for='username'>Wachtwoord</label>"
                     //  + "                 <label for='repeatPass'>Herhalen</label>"
                       + "                 <input placeholder='E-mail' name='username' type='text' id='registerUsername'>"
                       + "                 <input placeholder='Wachtwoord' name='password' type='password' id='registerUserPassword'>"
                       + "                 <input placeholder='Herhaal wachtwoord' name='repeatPass' type='password' id='registerUserRepeatPassword'>"
                       + "                 <input title='register' id='registerUserButton' type='button' value='Registreer'>"
                       + "                 <p class='errorMessage'></p>"
                       + "                 <a class='greySubText' href='#''>Wachtwoord vergeten?</a>"
                       + "         </div>"
                       + "     </div>"
                       + "     <div class='col-md-1'></div>"
                       + " </div>"
                   + " </div>";
    $(".overlay").css("display", "block");
    /*$("#searchTripPart").append(registerBox);*/
   /* $("body").append(registerBox);*/
   $("body").prepend(registerBox);
}


// FUNCTION CALLED TO SWITCH CATEGORIES (RESULT PAGE)
function switchCategory()
{
  // WHEN A CATEGORY IS CLICKED IS HAS BEEN GIVEN A YELLOW ICON = ACTIVE ICON
  // WHEN IT IS ALREADY ACTIVE AND STILL CLICKED THEN IT HAS BEEN GIVEN THE REGULAR BLUE ICON
  // TO INDICATE THAT THE CLICKED CATEGORY ISN'T ACTIVE ANYMORE
  var selectedCategory;
  var joinedFilters;
    var filters = [];
   

   $("li.category").on('click', function (event){

    var elementClassList = $(this)[0].classList;
    var category = $(this)[0].classList[1];
    selectedCategory = category;
    var imageUrlActive = "url('images/yellow_icons/" + category + ".png')";
    var imageUrlNormal = "url('images/lightblue_icons/" + category + ".png')";
    //console.log($("#" + category));
    if(jQuery.inArray("active",$(this)[0].classList) > -1)
    {
      //$(this).css("background-image",imageUrlNormal);

      $(this).removeClass(category + "Active");
      $(this).removeClass("active");

    }
    else
    {
      // WHEN THE CLICKED CATEGORY IS EVERYTHING, THEN ALL OF THE OTHER CATEGORIES ARE UNCHECKED AND NOT ACTIVE ANYMORE
      // ONLY THE EVERYTHING CATEGORY IS ACTIVE
      if($(this)[0].id == "everything")
      { 
        $(".categories li").each(function(key, value){
          //console.log(value.id);
          $("#" + value.id).removeClass("active");
          $("#" + value.id).removeClass(value.id + "Active");
        });
      }
      else
      {
        $("#everything").removeClass("active");
        $("#everything").removeClass("everythingActive");
      }

      $(this).addClass("active");
      $(this).addClass($(this)[0].id + "Active");
    }

    // THE FILTER OF THE CHOSEN CATEGORY IS ADDED TO AN ARRAY
    // WHEN IT IS ALREADY IN THE ARRAY, IT IS REMOVED (=TOGGLE)
    var currentDataFilter = $(this).attr('data-filter');
    //console.log("currentDataFilter: " + currentDataFilter);
    if(jQuery.inArray(currentDataFilter,filters) > -1)
      filters.pop(currentDataFilter);
    else
      filters.push(currentDataFilter);

    //console.log(filters);
    //console.log("filtersize " + filters.length);
    // ALL THESE FILTERS ARE JOINED SO THAT THE ISOTOPE FILTER FUNCTION CAN FILTER THE RESULTS PROPERLY
    joinedFilters = filters.join(', ');
    //console.log("joinedfilters " + joinedFilters);
      // SETTING THE FILTERING ON THE RESULTS WHEN CLICKED ON A CATEGORY
      // WHEN THIS IS EVERYTHING, ALL THE RESULTS ARE SHOWN
      // OTHERWISE, THE RESULTS MATCHING THE RIGHT CATEGORIES ARE SHOWN
    if($(this).hasClass("everything"))
    {

      $(".isotope").isotope({ filter: "*" });
        filters = [];
        joinedFilters = "";
    }
    else
     {
        $(".isotope").isotope({ filter: joinedFilters });
     } 

   /*    if($(this).hasClass("active"))
        {
          var filterValue = $(this).attr('data-filter');
          $(".isotope").isotope({ filter: joinedFilters });
        }
        else
        {

          $(".isotope").isotope({ filter: "*" });
        }    */ 
  });

/*  $(".categories li").on('click', function(){

    
  });*/

   // WHEN THE CURSOR ENTERS A CATEGORY, THE ICON DARKENS (ONLY IF THE CATEGORY ISN'T ACTIVE)
   $("li.category").on('mouseenter', function (event){
    var elementClassList = $(this)[0].classList;
    var category = $(this)[0].classList[1];
    if(jQuery.inArray("active",$(this)[0].classList) <= -1)
    {
      //var category = $(this)[0].classList[1];
      //var imageUrlHover = "url('images/blue_icons/" + category + ".png')";
      //$(this).css("background-image",imageUrlHover);
      $(this).addClass(category + "Hover");
    }

  });

   // WHEN THE CURSOR LEAVES A CATEGORY, THE ICON BRIGHTENS (ONLY IF THE CATEGORY ISN'T ACTIVE)
  $("li.category").on('mouseleave', function (event){
    var elementClassList = $(this)[0].classList;
    var category = $(this)[0].classList[1];
    if(jQuery.inArray("active",$(this)[0].classList) <= -1)
    {
      /*var elementClassList = $(this)[0].classList;
      var category = $(this)[0].classList[1];
      var imageUrlHover = "url('images/lightblue_icons/" + category + ".png')";
      $(this).css("background-image",imageUrlHover);*/
      $(this).removeClass(category + "Hover");
    }
  });

}

// FUNCTION TO EDIT THE TRIPNAME
// NEEDS TO BE ALTERED FOR INSERT/UPDATE IN DATABASE
function editTripName()
{
  // WHEN CLICKED ON THE SAVE TRIP BUTTON, IT HAS TO BE SAVED IN THE DATABASE
  $("#saveTrip").on('click', function(event){
    var newTripName = $("#editLocation").val();
     // TEMPORARY LINK TO NEXT (RESULT PAGE) WHEN "SEARCH/ZOEKEN" IS CLICKED
    appendLoginBox();
    //alert(newTripName);
  });

  // WHEN CLICKED ON THE MOBILE SAVE TRIP BUTTON, IT HAS TO BE SAVED IN THE DATABASE
  $("#mobSaveTrip").on('click', function(event){
    var newTripName = $("#editLocation").val();
     // TEMPORARY LINK TO NEXT (RESULT PAGE) WHEN "SEARCH/ZOEKEN" IS CLICKED
    appendLoginBox();
    //alert(newTripName);
  });

  //WHEN CLICKED ON THE EDIT VIEW BUTTON, THE RESULTS ARE SHOW EITHER IN A SINGLE COLUMN OR IN 2 COLUMNS
  $("#mobEditTrip").on('click', function(event){
    if($(this).hasClass("mobToggleView"))
    {
      $(this).removeClass("mobToggleView");
      $(this).addClass(".mobEditTrip");
      $(".item").css("width","50%");
    }  
    else
    {
      $(this).addClass("mobToggleView");
      $(this).removeClass(".mobEditTrip");
      $(".item").css("width","100%");
    }  
    $(".isotope").isotope('layout');
  });

  // WHEN CLICKED ON THE SAVE LIKE BUTTON (IN MOBILE VIEW), OTHER OPTIONS APPEAR/DISAPPEAR
  $("#mobSaveOptionsTrip").on('click', function(event){
   $(".optionsWrapper").toggle(); 
  });
  
}

// FUNCTION TO LOAD ISOTOPE FOR RESULTS
function loadIsotopeForResults()
{
      var qsRegex;

      var $container = $('.isotope').imagesLoaded( function() {
        $container.isotope({
        /*isInitLayout: false,*/
          itemSelector: '.item',
          // layout mode options
          masonry: {
            columnWidth: '.item'
          },
          filter: function() {
            return qsRegex ? $(this).text().match( qsRegex ) : true;
          }
        });
      });


      // WITH A REGEX FUNCTION TO HELP FILTER WHEN A USER ENTERS TEXT IN THE INPUT FIELD TO SEARCH
/*    $('.isotope').isotope({
        itemSelector: '.item',
        // layout mode options
        masonry: {
          columnWidth: '.item'
        },
        filter: function() {
          return qsRegex ? $(this).text().match( qsRegex ) : true;
        }
      });*/

    // HELPS TO SET THE LAYOUT
  //$(".isotope").isotope('layout');
  
// WHEN EVERY SINGLE INPUT BY KEYBOARD THIS FUNCTION CHECKS FOR MATCHES AMONG THE RESULTS
  var quicksearch = $('#inputEvent').keyup( debounce( function() {
    qsRegex = new RegExp( quicksearch.val(), 'gi' );
    $(".isotope").isotope();
  }, 100 ) );

// A USER CAN ALSO SEARCH BY FILLING IN THE INPUT AND CLICKING THE SEARCHBUTTON
    $("#searchEvent").on('click', function(event){
          var fullsearch = $("#inputEvent").val();
            qsRegex = new RegExp( fullsearch, 'gi' );
              $(".isotope").isotope();


    });

   

    //$(window).load(function(){$(".isotope").isotope('reLayout');});

}

// FUNCTION TO LOAD ISOTOPE FOR RESULTDETAIL
function loadIsotopeForResultDetail()
{
/*
    $('#resultDetail').isotope({
        itemSelector: '.result',
        // layout mode options
        masonry: {
          columnWidth: '.result'
        }
    });*/

     var $container = $('#resultDetail').imagesLoaded( function() {
        $container.isotope({
            itemSelector: '.result',
            // layout mode options
            masonry: {
              columnWidth: '.result'
            }
        });
      });

     $('#resultDetail').isotope('layout');


   // $(window).load(function(){$('#resultDetail').isotope('reLayout');});
}


// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout( delayed, threshold || 100 );
  }
}

// FUNCTION CALLED WHEN CLICKED AN A RESULT
// THE DETAILS APPEAR AND ALL THE RESULTS DISSAPPEAR
/*function showResultDetail()
{
  $(".resultSubText").on('click', function(){
      console.log($(this));
      
  });
}*/

// FUCTION TO BE CALLED TO SEARCH FOR A CUSTOM LOCATION
// AND SHOW IT ON A GOOGLE MAP
// IT NEEDS A STRING LOCATION AND GIVES THE COORDINATES, WHICH CAN BE USED IN THE REQUESTPOSITION FUNCTION
function setLocationOnMap(address)
{
    var geocoder = new google.maps.Geocoder();
    var address = address;//$("#customLocation").val();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK)
      {
          // do something with the geocoded result
          //
          var addressLat = results[0].geometry.location.k;
          var adressLon = results[0].geometry.location.B;
          //console.log("addressLat: " + addressLat + " adressLon " + adressLon);
          // PASS ALONG THE PARAMETERS TO UPDATE THE MAP
          initialize(adressLon, addressLat, true);
      }
    });

}

// WHEN CLICKED IN THE HAMBURGER ICON IN MOBILE VIEW, THE MOBILE NAVAGATION APPEARS/DISAPPEARS
function showMobileNavigation()
{
  $(".hamburger").on('click', function(event){
    var currentPage = window.location.pathname.split("/")[2];
    //$(".mobileNavItems").toggle();

   /* $(".mobileNavItems ul").slideToggle();*/
   // $(".mobileNavItems ul").toggle();
   // THE RIGHT CLASS HAS TO BE GIVEN TO THE SEPERATE GROUPS SO THAT THE RIGHT CSS ANIMATION IS GIVEN
    if($(".mobileNavItems").hasClass("moveDown"))
    {
      //$("#searchTripPart").css("margin-top","0px");
      $(".mobileNavItems").removeClass("moveDown");

        if(currentPage == "index.html")
          $("#searchTripPart").removeClass("moveDownSearchPartHome");
        else
          $("#searchTripPart").removeClass("moveDown");
    }  
    else
    {
      $(".mobileNavItems").addClass("moveDown");
      if(currentPage == "index.html")
          $("#searchTripPart").addClass("moveDownSearchPartHome");
        else
          $("#searchTripPart").addClass("moveDown");
      //$("#searchTripPart").css("margin-top","-22px");
    } 
  });

  // WHEN CLICKED ON EVERYTHING BUT THE HAMBURGER ICON WHEN THE MOBILE NAVIGATION IS SHOWN
  // THIS NAVIGATION CLOSES
  $("#searchTripPart").on('click', function(event){
    var currentPage = window.location.pathname.split("/")[2];
    if($(".mobileNavItems").hasClass("moveDown"))
    {
      //$("#searchTripPart").css("margin-top","0px");
       if(currentPage == "index.html")
         {
          $(".mobileNavItems").removeClass("moveDown");
          $("#searchTripPart").removeClass("moveDownSearchPartHome");
         }
        else
        {
          $(".mobileNavItems").removeClass("moveDown");
          $("#searchTripPart").removeClass("moveDown");
        }
    }  
  });

}


// FUNCTION CALLED WHEN THE WINDOW IS RESIZED
function checkWidthWindowOnResize()
{

  // WHEN CLICKED ON A RESULT, THAT DIV DISAPPEARS AND THE DETAILS SHOW
  // ALSO BUTTONS AND SEARCH FIELD THAT NEED TO BE SHOWN APPEAR AND ELEMENTS THAT NEED TO BE INVISIBLE DISAPPEAR
  $("#resultDetail").hide();
  $('#backToResults').hide();
  /*$(".item").on("click", function(event){*/
  $(".resultSubText").on("click", function(event){
    goToDetailsView();
  });

  $(".resultImage").on("click", function(event){
    goToDetailsView();
  });


  // WHEN CLICKED A BACK BUTTON, THE DETAILS DISAPPEAR AND THE RESULT LIST APPEARS
  // ALSO BUTTONS AND SEARCH FIELD THAT NEED TO BE SHOWN APPEAR AND ELEMENTS THAT NEED TO BE INVISIBLE DISAPPEAR
  $("#backToResults").on('click', function(){
    $('#resultDetail').isotope('layout');
    $('.isotope').isotope('layout');
      if($( window ).width() > 818)
      {   
         $("#resultcount").show();
      }
      $('.backToSearch').show();
      $('.backToResults').hide();
      $("#inputEvent").show();
      $("#searchEvent").show();
      $(".isotope").show();
      $("#resultDetail").hide();
      $(".addToMyTrips").hide();
      $(".shareTrip").hide();
      $("#backToResults").hide();
      $(".searchExtraStyle").css("right","-32px");
      $("#searchPanel").show();
      //$("#resultSection").css("height","100%");
  });

// THESE SETTINGS NEED TO BE CHECKED WHEN THE WINDOW RESIZES
  $(window).resize(function(){
     if($( window ).width() <= 818)
     {
        if($(".isotope").css('display') == "none")
        {
            $("#backToResults").hide();
            $(".backToResults").show();
            $(".backToSearch").hide();
            $("#mobEditTrip").hide();
            $("#mobSaveTrip").hide();
            /*$("#resultSection").css("height","100%");*/
           // $("#resultSection").css("height","auto");
            //$("#resultSection").css("overflow","visible");
            $(".addToMyTrips").val("Toevoegen");
            $("#addToMyTrips").removeClass("addToMyTrips");
            $("#addToMyTrips").addClass("mobAddToMyTrips");
        }
        else
         {
            $("#backToResults").hide();
            $(".backToResults").hide();
            $(".backToSearch").show();
            $("#mobEditTrip").show();
            $("#mobSaveTrip").show();
         }
     }
     else
     {
      $("#searchPanel").show();
      // IF THE MOBILE NAV IS SHOWING WHEN THE WIDTH OF THE WINDOW IS LARGER THAN 818px
      if($(".mobileNavItems").hasClass("moveDown"))
      {
        //$("#searchTripPart").css("margin-top","0px");
        var currentPage = window.location.pathname.split("/")[2];
         if(currentPage == "index.html")
         {
          $(".mobileNavItems").removeClass("moveDown");
          $("#searchTripPart").removeClass("moveDownSearchPartHome");
         }
        else
        {
          $(".mobileNavItems").removeClass("moveDown");
          $("#searchTripPart").removeClass("moveDown");
        }
      }  

      if($(".isotope").css('display') == "none")
         {
            $("#backToResults").show();
            $(".backToResults").hide();
            $("#backToSearch").hide();
            $(".addToMyTrips").val("");
            $("#addToMyTrips").addClass("addToMyTrips");
            $("#addToMyTrips").removeClass("mobAddToMyTrips");
         }

            $(".optionsWrapper").hide();
            $("#mobEditTrip").hide();
     }

  });
}

function goToDetailsView()
{
       // FUNCTION TO LOAD ISOTOPE FOR RESULTDETAIL
  loadIsotopeForResultDetail();
    $("#resultDetail").show();
      if($( window ).width() <= 818)
      {    
        $('#backToResults').hide();
        $('.backToResults').show();
        $('.backToSearch').hide();
        $("#searchPanel").hide();
        $("#resultSection").css("height","auto");
        $("#resultSection").css("overflow","visible");
        $("#mobEditTrip").hide();
        $("#mobSaveTrip").hide();
        $(".addToMyTrips").val("Toevoegen");
        $("#addToMyTrips").removeClass("addToMyTrips");
        $("#addToMyTrips").addClass("mobAddToMyTrips");
        $("#addToMyTrips").show();
        $(".extraSaveOptions").addClass("toggleOptionsMenu");
        $("#resultDetail").isotope('layout');
        $("#resultSection").show();
        
      }
      else
      {
        $('#backToResults').show();
        $('.backToResults').hide();
        $('.backToSearch').show();
        $("#searchPanel").show();
        $("#resultSection").css("height","100%");
        $("#mobEditTrip").hide();
        $("#mobSaveTrip").hide();
        $(".addToMyTrips").val("");
        $("#addToMyTrips").hide();
        $("#addToMyTrips").addClass("addToMyTrips");
        $("#addToMyTrips").removeClass("mobAddToMyTrips");
        //$(".extraSaveOptions:before").css("left","53%");
        //$(".extraSaveOptions:after").css("left","53%");
        $(".extraSaveOptions").removeClass("toggleOptionsMenu");

      }
      
      $("#inputEvent").hide();
      $("#searchEvent").hide();
      $(".isotope").hide();
      $("#resultDetail").show();
      $(".addToMyTrips").show();
      $(".shareTrip").show();
      $("#resultcount").hide();
      //$("#backToResults").show();
      $(".searchExtraStyle").css("right","-220px");

      // WHEN THE CURRENT PAGE IS THE RESULTS PAGE OR THE MYTRIPS PAGE
      // THE ADDRESS OF THE RESULT NEEDS TO BE SHOWN IN THE GOOGLE MAP
        var currentPage = window.location.pathname.split("/")[2];
        if(currentPage == "results.html" || currentPage == "my_trips.html")
        {
          var street = $("p.street").text();
          var city = $("p.city").text();
          var address = city + ", " + street;
          setLocationOnMap(address);
          //if($(".isotope").css("display") == "none")
          //$(".searchExtraStyle ").css("right","-23px");
        }
}
