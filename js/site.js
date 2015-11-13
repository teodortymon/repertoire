// call this from the developer console and you can control both instances

var calendars = {};
moment.locale('pl');


$(document).ready( function() {

    
        
    $('.open-popup-link').magnificPopup();      //Popup initialize
    $('.menu').dropit();
    

    var thisMonth = moment().format('YYYY-MM');
    clndr = $('.cal').clndr({
    events: eventArray,
    // constraints: {
    //   startDate: '2013-11-01',
    //   endDate: '2013-11-15'
    // },
    dateParameter: 'date',
    theatreParameter: 'theatre',
    clickEvents: {
        click: function(target) {
            $(".popup").find("h1").html(target["date"].format('dddd D MMMM'));
            $('.open-popup-link').click();
            //$('#myModal').modal();
            var previousTheatre;
            $('.popup').find("p").html("");
            $('.popup').find("h3").html("");
            
            for (a=0; a<target.events.length; ++a){
                if(previousTheatre !== target.events[a].theatre){
                    $('.popup').find("p").append("<h3>"+Database[city]['theatresNames'][target.events[a].theatre]+"</h3>");
                    };
                $('.popup').find("p").append(target.events[a]["title"] + "<br />");
                console.log(target.events[a]);
                }
            }
    },
    showAdjacentMonths: false,
    adjacentDaysChangeMonth: false,
    });
    var eventArray = [];
            
    var templateData = {'theatresList': _.keys(Database[city]['theatresEvents']), 'theatresNames': Database[city]['theatresNames']}; 
    var template = _.template($("script#theaters-template").html(), templateData);
    $("#buttons-theaters").html(template);
    
    
    var templateData = {'cityList': _.keys(cityNames)};
    var template = _.template($("script#cities-template").html(), templateData);
    $("#buttons-cities").html(template);
    $("#"+city).toggleClass("inactive");
    console.log(city);
    
    $("#buttons-cities").click(function( event ) {
        var clickedCity = event.target.id;
        console.log(clickedCity);
        console.log(city);
        
        $("#"+city).toggleClass("inactive");
        $("#"+clickedCity).toggleClass("inactive");
        _.each(Database[city]['theatresEvents'], function (Rtheatre){
            clndr.removeEvents(Rtheatre);
        });
        city = clickedCity;
        console.log(city);
        // $("#city-name").html(cityNames[city]);
        templateData = {'theatresList': _.keys(Database[city]['theatresEvents']), 'theatresNames': Database[city]['theatresNames']}; 
        template = _.template($("script#theaters-template").html(), templateData);
        $("#buttons-theaters").html(template);
        console.log(window.EventsThisMonth);
    });
    
            
 $("#buttons-theaters").click(function( event ) {
        var clickedTheatre = event.target.id;
        console.log(clickedTheatre, city);
        $("#"+clickedTheatre).toggleClass("inactive");
        if ($("#"+clickedTheatre).hasClass("inactive")) {
                clndr.removeEvents(Database[city]['theatresEvents'][clickedTheatre]);
            }
            else{
                clndr.addEvents(Database[city]['theatresEvents'][clickedTheatre]);
                //console.log(daysArray.eventsThisMonth);
            };
        console.log(window.EventsThisMonth);
    });
    // $('.menu').dropit;
    // $( ".dropit" ).click(function( clicked ) {
    //     _.each(Database[city]['theatresEvents'], function (Rtheatre){
    //         clndr.removeEvents(Rtheatre);
    //     });
    //     city = clicked.target.id;
    //     console.log(city);
    //     $("#city-name").html(cityNames[city]);
    //     templateData = {'theatresList': _.keys(Database[city]['theatresEvents']), 'theatresNames': Database[city]['theatresNames']}; 
    //     template = _.template($("script#buttons-template").html(), templateData);
    // $("#buttons-theaters").html(template);
    // });
    
    
    
    

// bind both clndrs to the left and right arrow keys
//$(document).keydown( function(e) {
//    if(e.keyCode == 37) {
//        // left arrow
//        calendars.clndr1.back();
//        calendars.clndr2.back();
//    }
//    if(e.keyCode == 39) {
//        // right arrow
//        calendars.clndr1.forward();
//        calendars.clndr2.forward();
//    }
//});
});