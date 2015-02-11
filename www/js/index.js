document.addEventListener('deviceready', function() {


    /*
     _    _____    ____  _____
    | |  / /   |  / __ \/ ___/
    | | / / /| | / /_/ /\__ \ 
    | |/ / ___ |/ _, _/___/ / 
    |___/_/  |_/_/ |_|/____/  
                              
*/





    var helperTag = false;
    var loader = "<div class='container'><img src='imgs/loader.gif'></div>";
    var homePage = $(".home").html();
    var login = $(".login").html();
    var pageQueue = [];
    var currentPage = "";
    var lastPage = "init";


    var injectPlayers, injectVids, injectRank, injectNews, injectFixtures, injectRecords;
    var htmlFixtures = "<h4>World Cup Fixtures 2015</h4><hr><button id='sort' class='btn btn-block btn-success'>Proteas Games</button>";
    var fixturesHtml = htmlFixtures + "<h4>Feb</h4><table class='table table-striped table-condensed'><tr><th>Team A</th><th>Team B</th><th>Grounds</th><th>Date</th></tr>";
    var fixturesHtml2 = "<h4>March</h4><table class='table table-striped table-condensed'><tr><th>Team A</th><th>Team B</th><th>Grounds</th><th>Date</th></tr>";
    var htmlPlayers = "<h4>Protea World Cup Squad 2015</h4><hr><ul>";
    var url = "https://www.kimonolabs.com/api/8m7imhmo?apikey=bn8MJcEsGlx72UgJ3ee0zXHvEUugNRKM";



    var injectHome = $(".home").html();


    $("#page").on("touchstart", "#all", function() {

        $("#page table").show();
        $("h6").show();



    });

    $(document).on("touchend", "#brand", function() {
        navigator.notification.alert(
            '*This is the Unofficial Protea Fan App for the ICC CWC 2015.\n\nThis Mobile Application is made by Protea Fans for Protea Fans. The app not the property of Cricket South Africa or #proteafire campaign. By using this app you agree to use it for test purposes only and not for commercial purposes. Unauthorised distribution of this app is prohibited.\n\n\nCricket South Africa will launch it’s own official Mobile Application end of 2015.', // message
            null,
            'UNOFFICIAL',
            'ACCEPT'
        );

         var dimensions23 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('disclaimer', dimensions23);
    });


    $("#page").on("touchstart", "#odis", function() {

        $("#page table").hide();
        $("h6").hide();
        $(".odi").show();
        $(".odiLabel").show();

    });

    $("#page").on("touchstart", "#tests", function() {
        $("#page table").hide();
        $("h6").hide();
        $(".test").show();
        $(".testLabel").show();
    });

    $("#page").on("touchstart", "#t20s", function() {
        $("#page table").hide();
        $("h6").hide();
        $(".t20").show();
        $(".t20Label").show();
    });



    document.addEventListener("backbutton", function(e) {


        $("#page").html("");
        $("#page").html(lastPage);

    }, true);

    $("body").on("touchstart", "#backer", function(e) {

    });



    $("#page").on("touchstart", "#sort", function(e) {

        $(".notSaGames").remove();

    });






    $("body").on("touchstart", "#wcLauncher", function(e) {


        $(".wcMenu").toggle();

       
    });






    $("#page").on("touchstart", "#register", function(e) {


        var u = $("#nickName").val();
        var e = $("#email").val();
        var p = $("#userPassword").val();

        if (u == "" || p == "" || e == "") {
            $("#statusMsg").html("<br><h4>You must enter all details to register!</h4>").fadeIn();
            return;
        }


        $("#statusMsg").html(loader);
        var user = new Parse.User();
        user.set("username", u);
        user.set("password", p);
        user.set("email", e);

        var userDetails = {};
        userDetails.u = u;
        userDetails.p = p;
        userDetails.e = e;



        user.signUp(null, {
            success: function(user) {
                $("#page").hide();
                $("#page").html('');
                $("#page").scrollTop();
                $("#page").css("background-image", "imgs/bigBG.jpg");


                $("#mainMenu").show();
                $("#footer").show();
                $("#page").html(injectHome).show();
                currentPage = injectHome;
                window.localStorage.setItem("user", JSON.stringify(userDetails));
            },
            error: function(user, error) {
                //alert(JSON.stringify(error));
                navigator.notification.alert(error.message);
                //$("#regstatus").html(error.message).addClass("errorDiv");
            }
        });


    });



    $("#page").on("touchend", "#bestBattingInnings",
        function(e) {
            lastPage = injectRecords;
            $.getJSON("highestBattingInnings.json", function(d) {
                $("#page").html("");
                h = "<div class='container' style='margin-top:5px;padding-bottom:45px'><h4>Most Runs in a WC Innings</h4><table class='table table-striped'>";
                h += "<tr><th>Runs</th><th>Player</th><th>Match</th><th>Year</th></tr>";
                $.each(d, function(i, o) {

                    h += "<tr><td>" + o.score + "</td><td>" + o.player.text + "</td><td>" + o.match.text + "</td><td>" + o.year + "</td></tr>";

                });
                h += "</table><br><br><br></div>";
                $("#page").html(h);
            });
        });

    $("#page").on("touchend", "#bowlingCareer",
        function(e) {
            lastPage = injectRecords;
            $.getJSON("bowlingCareer.json", function(d3) {
                $("#page").html("");
                h = "<div class='container' style='margin-top:5px;padding-bottom:45px'><h4>Protea WC Bowling Stats</h4><table class='table table-striped'>";
                h += "<tr><th>Player</th><th>Wkts</th><th>Avg</th><th>Strike Rate</th><th>Econ</th></tr>";
                $.each(d3, function(i, o) {

                    h += "<tr><td>" + o.player.text + "</td><td>" + o.wkts + "</td><td>" + o.avg + "</td><td>" + o.srate + "</td><td>" + o.econ + "</td></tr>";

                });
                h += "</table><br><br><br></div>";
                $("#page").html(h);
            });
        });


    $("#page").on("touchstart", "#refresh", function() {
        $("#connect").trigger("touchstart");
    });



    $("#footer").on("touchstart", "#connect",
        function(e) {
            $("#page").html('');
            $("#page").scrollTop();
            $("#page").html("<div class='container'><h4>Loading Social Media Feed...</h4><br>" + loader + "</div>");

            $.ajax({
                url: "http://proteafirefan.tumblr.com/api/read/json?num=50",
                type: "get",
                dataType: "html"
            }).done(function(data) {
                    eval(data);
                    var reData = tumblr_api_read;
                    console.log(reData.posts);
                    var hr = "<h4>#proteaFire Social Media Feed</h4><hr><ul>";
                    $.each(reData.posts, function(i, o) {

                        if (o.type == "regular") {
                            console.log(JSON.stringify(o));
                            hr += "<li class='tweets'>" + o['regular-body'] + "<div class='date'>" + o.date.substr(0, 17); + " || " + o['regular-title'] + "</div></li>";
                            //alert(hr);
                        }



                        //if (o.type == "photo") {
                        // alert(JSON.stringify(o));
                        // hr += "<li><div class='box'><img src='"+o['photo-url-250']+"'></div></li>";
                        //}







                    });

                    hr += "</ul>";

                    hd = "<button class='btn btn-success btn-xs pull-right' id='refresh' style='position:relative;top:30px'>refresh</button>";
                    $("#page").html('');
                    $("#page").scrollTop();
                    $("#page").html(hr);
                    $("#page").prepend(hd).fadeIn(2000);
                    var dimensions3 = {
                        model: device.model,
                        platform: device.platform
                    };


                    Parse.Analytics.track('connect', dimensions3);

                }




            );
        });

    $(document).on("touchstart", "#page", function() {
        $(".wcMenu").hide();
    });

    $("#page").on("touchend", "#boundariesInnings", function(e) {
        lastPage = injectRecords;
        $.getJSON("mostBoundariesInnings.json", function(data) {
            i = "<div class='container'><h4>Most Boundaires in a WC Innings</h4><table class='table table-striped'>";
            i += "<tr><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th><th>Player</th><th>Year</th></tr>";

            $.each(data, function(er, o) {
                i += "<tr><td>" + o.balls + "</td><td>" + o.runs + "</td><td>" + o.fours + "</td><td>" + o.sixes + "</td><td>" + o.player.text + "</td><td>" + o.year + "</td></tr>";
            });

            i += "</table><br><br><br></div>";
            $("#page").scrollTop();
            $("#page").html(i);


        });
    });

    $("#page").on("touchend", "#runsByLineup", function(e) {
        lastPage = injectRecords;
        $.getJSON("mostRunsPerBattingLineup.json", function(dt) {
            i = "<div class='container'><h4>Most Runs by Position in a WC Innings</h4><table class='table table-striped'>";
            i += "<tr><th>Position</th><th>Score</th><th>Player</th><th>Match</th></tr>";

            $.each(dt, function(er, o) {
                i += "<tr><td>" + o.position + "</td><td>" + o.score + "</td><td>" + o.player.text + "</td><td>" + o.match.text + "</td></tr>";
            });

            i += "</table><br><br><br></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });
    });


    $("#page").on("touchend", "#totalRuns", function(e) {
        lastPage = injectRecords;
        $.getJSON("mostRunsTotal.json", function(dat) {
            i = "<div class='container'><h4>Most Career Runs in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Player</th><th>Matches</th><th>Runs</th><th>High</th><th>Avg</th></tr>";

            $.each(dat, function(er, o) {
                i += "<tr><td>" + o.player.text + "</td><td>" + o.matches + "</td><td>" + o.runs + "</td><td>" + o.high + "</td><td>" + o.average + "</td></tr>";
            });

            i += "</table><br><br><br></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });

    });









    $("#page").on("touchend", "#wicketPartnerships", function() {
        lastPage = injectRecords;

        $.getJSON("wicketPartnerships.json", function(data5) {
            i = "<div class='container'><h4>Highest Wkt Parternships in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Wkt</th><th>Rns</th><th>Plyrs</th><th>Mtch</th><th>Yr</th></tr>";

            $.each(data5, function(er, o) {
                i += "<tr><td>" + o.wicket + "</td><td>" + o.runs + "</td><td>" + o.players + "</td><td>" + o.match.text + "</td><td>" + o.year + "</td></tr>";
            });

            i += "</table><br><br><br></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });
    });









    $("#page").on("touchend", "#runsConceded", function() {
        lastPage = injectRecords;

        $.getJSON("mostRunsConceded.json", function(data4) {
            i = "<div class='container'><h4>Most Runs Conceded in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Score</th><th>Player</th><th>Match</th><th>Year</th></tr>";

            $.each(data4, function(er, o) {
                i += "<tr><td>" + o.score + "</td><td>" + o.bowler.text + "</td><td>" + o.match.text + "</td><td>" + o.year + "</td></tr>";
            });

            i += "</table><br><br><br></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });
    });

    $("#page").on("touchend", "#mostWickets", function(e) {
        lastPage = injectRecords;
        $.getJSON("mostWickets.json", function(data2) {
            i = "<div class='container'><h4>Most Career Wickets in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Player</th><th>Wickets</th><th>Best</th><th>Average</th></tr>";

            $.each(data2, function(er, o) {
                i += "<tr><td>" + o.player.text + "</td><td>" + o.wkts + "</td><td>" + o.best + "</td><td>" + o.average + "</td></tr>";
            });

            i += "</table><br><br><br></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });
    });
    $("#page").on("touchend", "#bestBowlingInnings", function(e) {
        lastPage = injectRecords;
        $.getJSON("bestInningsBowling.json", function(data3) {
            i = "<div class='container'><h4>Best Bowling Innings in the WC</h4><table class='table table-striped'>";
            i += "<tr><th>Score</th><th>Player</th><th>Match</th><th>Year</th></tr>";

            $.each(data3, function(er, o) {
                i += "<tr><td>" + o.score + "</td><td>" + o.player.text + "</td><td>" + o.match.text + "</td><td>" + o.year + "</td></tr>";
            });

            i += "</table><br><br><br></div>";
            $("#page").scrollTop();
            $("#page").html(i);
        });
    });



    $("#footer").on("touchstart", "#players", function(e) {
        lastPage = currentPage;
        //alert($(".players").html());
        $("#page").html('');
        $("#page").scrollTop();
        $("#page").html(injectPlayers)
        currentPage = injectPlayers;

         var dimensions26 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('players', dimensions26);

    });

    $("#footer").on("touchstart", "#videos", function(e) {

        getVideos();








        var dimensions6 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('videos', dimensions6);

    });


    $("#footer").on("touchstart", "#rankings", function(e) {
        getRankings();
        $("#page").scrollTop();
        $("#page").html('<h4>Loading current ICC Rankings</h4><br>' + loader);





        lastPage = currentPage;



        currentPage = injectRank;

    });

    $("#footer").on("touchstart", "#records", function(e) {
        lastPage = currentPage;
        $("#page").html('');

        $("#page").html(injectRecords);
        $("#page").scrollTop();
        currentPage = injectRecords


        var dimensions8 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('records', dimensions8);

    });

    $(".wcMenu").on("touchstart", "#fixtures", function(e) {
        lastPage = currentPage;
        $("#page").html('');
        $("#page").scrollTop();
        $("#page").html(injectFixtures);
        $(".wcMenu").hide();
        currentPage = injectFixtures;

         var dimensions25 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('wcFixtures', dimensions25);
    });

    $(".wcMenu").on("touchstart", "#recordsWC", function(e) {
        lastPage = currentPage;
        $("#page").html('');
        $("#page").scrollTop();
        $("#page").html(injectRecords);
        $(".wcMenu").hide();
        currentPage = injectRecords

        var dimensions9 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('records-wc', dimensions9);
    });


    $("#page").on("touchstart", "#groupa", function() {

        $("h5").hide();
        $("#page table").hide();
        $("#page table.groupa").show();
        $(".grpaLabel").show();

    });

    $("#page").on("touchstart", "#groupb", function() {
        $("h5").hide();
        $("#page table").hide();
        $(".groupb").show();
        $(".grpbLabel").show();
    });

    $(".wcMenu").on("touchstart", "#resultsLog", function(e) {

        $(".wcMenu").hide();
        $("#page").html("<h4>Loading Current Results...</h4>" + loader);




        var wcLogs = Parse.Object.extend("wcResultsLog");
        var query3 = new Parse.Query(wcLogs);
        query3.ascending("position")
        var h9 = "<h4>World Cup Results Log</h4>";
        h9 += "<div class='btn-group'><button id='groupa' class='btn btn-success'>Group A</button><button id='groupb' class='btn btn-success'>Group B</button></div>";
        h9 += "<h5 class='grpaLabel'>Group A</h5><table class='table table-striped groupa'><tr><th>Pos</th><th>Team</th><th>P</th><th>W</th><th>L</th><th>T</th><th>PTS</th><th>NRR</th></tr>";
        var h10 = "<h5 class='grpbLabel'>Group B</h5><table style='margin-bottom:45px' class='table table-striped groupb'><tr><th>Pos</th><th>Team</th><th>P</th><th>W</th><th>L</th><th>T</th><th>PTS</th><th>NRR</th></tr>";

        query3.find({
            success: function(results) {
                for (var i2 = 0; i2 < results.length; i2++) {
                    var object = results[i2];
                    if (object.get("group") == "a") {
                        h9 += "<tr class='groupa'><td>" + object.get("position") + "</td><td>" + object.get("team") + "</td><td>" + object.get("played") + "</td><td>" + object.get("won") + "</td><td>" + object.get("loss") + "</td><td>" + object.get("tied") + "</td><td>" + object.get("points") + "</td><td>" + object.get("nrr") + "</td><tr>";
                    } else {

                        if (object.get("team") == "South Africa") {
                            h10 += "<tr class='groupb success'><td>" + object.get("position") + "</td><td>" + object.get("team") + "</td><td>" + object.get("played") + "</td><td>" + object.get("won") + "</td><td>" + object.get("loss") + "</td><td>" + object.get("tied") + "</td><td>" + object.get("points") + "</td><td>" + object.get("nrr") + "</td><tr>";

                        } else {
                            h10 += "<tr class='groupb'><td>" + object.get("position") + "</td><td>" + object.get("team") + "</td><td>" + object.get("played") + "</td><td>" + object.get("won") + "</td><td>" + object.get("loss") + "</td><td>" + object.get("tied") + "</td><td>" + object.get("points") + "</td><td>" + object.get("nrr") + "</td><tr>";

                        }
                    }



                }

                h9 += "</table>";
                h10 += "</table>";
                $("#page").html('');
                $("#page").scrollTop();
                $("#page").html(h9 + h10);
                 var dimensions22 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('wcResults', dimensions22);

            },
            error: function(error) {


            }
        });









    });







    $("#page").on("touchend", "#logout", function() {

        window.localStorage.removeItem("user");
        $("#mainMenu").hide();
        $("#footer").hide();
        $("#page").html(login);

    });

    $("#page").on("touchend", "#save", function() {

        if ($("#pushSetting").is(":checked")) {

            /*            parsePlugin.subscribe('allAlerts', function() {
        navigator.notifications.alert('You have subcribed to Push Alerts');
    }, function(e) {
        alert('error')e;
    });*/


        } else {

            /*            parsePlugin.unsubscribe('allAlerts', function() {
        navigator.notifications.alert('You have subcribed to Push Alerts');
    }, function(e) {
        alert('error');
    });*/

        }

        if ($("#emailSetting").is(":checked")) {

        } else {

        }
    });

    //alert(device.platform);

    $("#page").on("touchstart", "a", function(e) {
        e.preventDefault();


        srcLink = $(this).attr("href");
        //alert(srcLink);
        window.open(srcLink, '_blank', 'location=yes');

        srcLink = "";
         var dimensions29 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('extLink', dimensions29);

    });

    $("#footer").on("touchstart", "#news", function(e) {

        $("#page").html("<h4>Loading latest News</h4><br>" + loader);
        hNew = "<h4>Latest South African News</h4><ul>"
        $.ajax({
            url: "http://pipes.yahoo.com/pipes/pipe.run?_id=fb5976bfef39b2913e42671e86c505c5&_render=json",
            dataType: "json",

        }).done(function(data) {
            $.each(data.value.items, function(i, o) {
                hNew += "<li class='newsItem'><a style='color:#007E45' data-titler= '" + o.title + "' href='" + o.link + "' class='newsLinks' id='" + o.link + "'>" + o.title + "</a><br><p style='font-size:12px;margin-bottom:-10px'>" + o.pubDate + "</p><hr></li>";
            });

            lastPage = currentPage;
            hNew += "</ul><br><br><br>";
            $("#page").scrollTop();
            $("#page").html("");
            $("#page").html(hNew);
            currentPage = hNew;

             var dimensions24 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('news', dimensions24);

        });

    });




    $("#footer").on("touchstart", "#settings", function(e) {

        var settings = $(".settings").html();
        $("#page").html(settings);

    });



    $(".wcMenu").on("touchstart", "#featuresWC", function(e) {


        getBlocks();
        lastPage = currentPage;
        $("#page").html('');
        $("#page").scrollTop();


        $(".wcMenu").hide();
        var injectFeatures = $(".features").html();
        $("#page").html(injectFeatures);
        $(".carousel-inner").swipe({


            swipeRight: function() {
                $(this).parent().carousel('prev');

            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 0
        });


        currentPage = injectHome;


        var dimensions4 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('features', dimensions4);

    });









    $("#footer").on("touchstart", "#home", function(e) {
        getBlocks();
        lastPage = currentPage;
        $("#page").html('');
        $("#page").scrollTop();



        var injectFeatures = $(".features").html();
        $("#page").html(injectFeatures);

        $(".carousel-inner").swipe({


            swipeRight: function() {
                $(this).parent().carousel('prev');

            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 0
        });

        currentPage = injectHome;


        var dimensions5 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('features-icon', dimensions5);

    });


    $.getJSON("fixtures.json", processData);

    function processData(data) {

        $.each(data.feb, function(i, o) {
            console.log(JSON.stringify(o));

            if (o.team1 === "South Africa" || o.team2 === "South Africa") {
                fixturesHtml += "<tr class='success'><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Feb-" + o.date + "</td></tr>";

            } else {
                fixturesHtml += "<tr class='notSaGames'><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Mar-" + o.date + "</td></tr>";

            }


        });

        fixturesHtml += "</table>";

        $.each(data.march, function(i, o) {
            if (o.team1 === "South Africa" || o.team2 === "South Africa" || o.team1 == "TBA (Final)") {
                fixturesHtml2 += "<tr class='success'><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Mar - " + o.date + "</td></tr>";
            } else {
                fixturesHtml2 += "<tr class='notSaGames'><td>" + o.team1 + "</td><td>" + o.team2 + "</td><td>" + o.grounds + "</td><td>Mar - " + o.date + "</td></tr>";

            }

        });

        fixturesHtml2 += "</table><br><br>";


        $(".fixtures").html(fixturesHtml + fixturesHtml2);
        injectFixtures = $(".fixtures").html()
    };




    $.getJSON("proteas.json", processPlayers);

    function processPlayers(dt) {
        $.each(dt, function(ind, ob) {
            if (ob.player.name == "Farhaan Behardien") {
                // alert("Behardien");
                htmlPlayers += "<li class='link' style='margin-left:15px;height:100px;margin-bottom:40px;border-bottom:2px solid #c1c1c1'><div style='float:left;margin-right:50px'><img id='" + JSON.stringify(ob.player) + "' class='pic' style='width:70px;' src='" + ob.player.img + "'></div><h4 style='margin-bottom:-4px'>" + ob.player.name + "</h4><p style='margin-bottom:-4px'>" + ob.player.role + "</p>" +
                    "<p style='margin-bottom:55px'>" + ob.player.birthdate + "</p></li>";
            } else {
                htmlPlayers += "<li class='link' style='height:100px;margin-bottom:40px;border-bottom:2px solid #c1c1c1'><div style='float:left;margin-right:50px'><img id='" + JSON.stringify(ob.player) + "' class='pic' style='width:100px;' src='" + ob.player.img + "'></div><h4 style='margin-bottom:-4px'>" + ob.player.name + "</h4><p style='margin-bottom:-4px'>" + ob.player.role + "</p>" +
                    "<pstyle='margin-bottom:55px'>" + ob.player.birthdate + "</p></li>";
            }

        });

        $("#page").on("touchend", ".pic", function(e) {
            e.preventDefault();
            playerPackage = e.target.id;
            $(".players").trigger("playerSelected", playerPackage);
        });

        htmlPlayers += "</ul>";

        $(".players").append(htmlPlayers);
        injectPlayers = $(".players").html();
        currentPage = injectPlayers;

    };






    $(".players").on("playerSelected", function(e, d) {
        lastPage = currentPage;
        $("#page").html('');
        var playerData = JSON.parse(d);
        var playerDetails = "<div class='container'>";
        playerDetails += "<h4>" + playerData.name + "</h4>";
        playerDetails += "<img class='img-rounded' style='margin-top:10px' src='" + playerData.img + "' width='300'>";

        playerDetails += "<br><br><table class='table table-striped table-bordered'>";
        playerDetails += "<tr><td>" + playerData.role + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.birthdate + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.birthplace + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.batting + "</td></tr>";
        playerDetails += "<tr><td>" + playerData.bowling + "</td></tr></table>";


        playerDetails += "<table class='table table-striped table table-bordered'>";
        playerDetails += "<tr><td>Matches</td><td>Runs</td><td>Wickets</td></tr>";
        playerDetails += "<tr class='success'><td>" + playerData.matches + "</td><td>" + playerData.runs + "</td><td>" + playerData.wickets + "</td></tr>";
        playerDetails += "</table>";

        if (playerData.twitter != "") {
            playerDetails += "<h5>Social Media Links</h5><table class='table'>";
            playerDetails += "";
            playerDetails += "<tr align='center'><td><a href='" + playerData.insta + "'><img src='imgs/instagram.jpg' width='50'></a></td><td><a href='" + playerData.twitter + "'><img src='imgs/twitter.jpg' width='50'></a></td></tr>";
            playerDetails += "</table><br>";

        }

        playerDetails += "<p>" + playerData.bio + "</p><br><br><br>";
        playerDetails += "</div>";
        $("#page").scrollTop();

        $("#page").html(playerDetails);

 var dimensions27 = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track(playerData.name, dimensions27);

    });



    var getRankings = function() {
        var html = "<h4>Current ICC International Rankings</h4>";
        html += "<div class='btn-group'><button id='tests' class='btn btn-success'>Test</button><button id='odis' class='btn btn-success'>ODIs</button><button id='t20s' class='btn btn-success'>T20s</button><button id='all' class='btn btn-success'>All</button></div>";
        html += "<h6 class='testLabel'>Test</h6><table class='table table-striped test'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
        var html2 = "<h6 class='odiLabel'>ODI</h6><table class='table table-striped odi'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";
        var html3 = "<h6 class='t20Label'>T20</h6><table class='table table-striped t20'><tr><th>Team</th><th>Matches</th><th>Points</th><th>Rating</th></tr>";

        $("#page").html("");
        $.getJSON(url, processData2);


        function processData2(data) {
            //console.log(JSON.stringify(data));

            $.each(data.results.test, function(i, o) {
                //console.log(JSON.stringify(o));

                if (o.test_team == "South Africa") {
                    html += "<tr class='success'><td>" + o.test_team + "</td><td>" + o.test_matches + "</td><td>" + o.test_points + "</td><td>" + o.test_rating + "</td></tr>";

                } else {
                    html += "<tr><td>" + o.test_team + "</td><td>" + o.test_matches + "</td><td>" + o.test_points + "</td><td>" + o.test_rating + "</td></tr>";

                }

            });





            $.each(data.results.odi, function(i, o) {
                //console.log(JSON.stringify(o));

                if (o.odi_team == "South Africa") {
                    html2 += "<tr class='success'><td>" + o.odi_team + "</td><td>" + o.odi_matches + "</td><td>" + o.odi_points + "</td><td>" + o.odi_rating + "</td></tr>";

                } else {
                    html2 += "<tr><td>" + o.odi_team + "</td><td>" + o.odi_matches + "</td><td>" + o.odi_points + "</td><td>" + o.odi_rating + "</td></tr>";

                }

            });



            $.each(data.results.T20, function(i, o) {
                //console.log(JSON.stringify(o));
                if (o.t20_team == "South Africa") {
                    html3 += "<tr class='success'><td>" + o.t20_team + "</td><td>" + o.t20_matches + "</td><td>" + o.t20_points + "</td><td>" + o.t20_rating + "</td></tr>";

                } else {
                    html3 += "<tr><td>" + o.t20_team + "</td><td>" + o.t20_matches + "</td><td>" + o.t20_points + "</td><td>" + o.t20_rating + "</td></tr>";

                }
            });

            html += "</table>";
            html2 += "</table>";
            html3 += "</table>";


            $("#page").html(html + html2 + html3);
            //injectRank = $(".rankings").html()

        }

    };


    var getVideos = function() {
        $("#page").scrollTop();
        $("#page").html('<h4>Loading ProteaFire Video Feed</h4>' + loader);

        var htmlVids = "<h4>Protea Fire Videos</h4><hr><ul>";
        $.getJSON("videos_backup.json", parseData);

        function parseData(data) {
            $.each(data, function(ind, obj) {
                htmlVids += "<li><h4>" + obj.video.text + "</h4><iframe width='100%' height='215' src='http://www.youtube.com/embed/" + obj.video.href + "?rel=0&amp;controls=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe></li>";
            });


            htmlVids += "</ul><br><br><br>";
            $("#page").html("");
            $("#page").html(htmlVids);
            injectVids = $("#page").html();
        };
    }


    $("body").on("touchstart", "#page", function() {
        //$("#helper").remove();
    })

    var blocksArray = [];
    var tz1Obj = {};

    var offline = true;
    var getBlocks = function() {

        if (offline == false) {
            var allBlocks = JSON.parse(window.localStorage.getItem("BLOCKS"));
            $("#temp").remove();
            $("#temp2").remove();
            $("#temp3").remove();
            $("#targetZone3").html(allBlocks.block1);
            $("#targetZone2").html(allBlocks.block2);
            $("#targetZone1").html(allBlocks.block3);
        } else {
            var leadUp = Parse.Object.extend("wcLeadUp");
            var query3 = new Parse.Query(leadUp);
            //$("#targetZone2").append("<div id='temp'>" + loader + "</div>");
            query3.find({
                success: function(results) {
                    for (var i3 = 0; i3 < results.length; i3++) {
                        var object = results[i3];

                        h3 = object.get('body');

                        tz1Obj.block1 = h3;

                    }
                    $("#temp3").remove();
                    $("#targetZone1").append(h3)
                    window.localStorage.setItem("BLOCKS", JSON.stringify(tz1Obj));

                },
                error: function(error) {}
            });


            var feat = Parse.Object.extend("featuredPlayer");
            var query2 = new Parse.Query(feat);
            //$("#targetZone3").append("<div id='temp2'>" + loader + "</div>");

            query2.find({
                success: function(results) {
                    for (var i2 = 0; i2 < results.length; i2++) {
                        var object = results[i2];
                        h2 = object.get('body');

                        tz1Obj.block3 = h2;

                    }
                    $("#temp2").remove();
                    $("#targetZone3").append(h2)
                    window.localStorage.setItem("BLOCKS", JSON.stringify(tz1Obj));

                },
                error: function(error) {


                }
            });



            var adBlock = Parse.Object.extend("adBlock");
            var query = new Parse.Query(adBlock);
            //$("#targetZone2").append("<div id='temp'>" + loader + "</div>");
            query.find({
                success: function(results) {
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        h = object.get('body');

                        tz1Obj.block2 = h;

                    }
                    $("#temp").remove();
                    $("#targetZone2").append(h)
                    window.localStorage.setItem("BLOCKS", JSON.stringify(tz1Obj));

                },
                error: function(error) {}
            });



        }




    };


    injectNews = $(".news").html();

    injectRecords = $(".records").html();



    var wcLogsUrl = "https://www.kimonolabs.com/api/8wqdzeqg?apikey=bn8MJcEsGlx72UgJ3ee0zXHvEUugNRKM";



    var init = function() {



        var images = new Array();

        function preload() {
            for (i = 0; i < preload.arguments.length; i++) {
                //alert("loading");
                images[i] = new Image()
                images[i].src = preload.arguments[i]
            }
        }
        preload(
            "imgs/proteas.jpg",
            "imgs/wc_logo.jpg",
            "imgs/loader.gif",
            "imgs/38.png",
            "imgs/abd.png",
            "imgs/ap.png",
            "imgs/dm.png",
            "imgs/ds.png",
            "imgs/fdp.png",
            "imgs/ha.png",
            "imgs/it.png",
            "imgs/jpd.png",
            "imgs/ka.png",
            "imgs/mm.png",
            "imgs/qdk.png",
            "imgs/rr.png",
            "imgs/vp.png",
            "imgs/wp.png",
            "imgs/twitter.jpg",
            "imgs/instagram.png"

        )



        Parse.initialize("jParK9CQZdIRCsZtJ4d3UR5s1HNcZZPUhXlBJ1BN", "qOWRwgP5SPUjGFzy5BrIKRHuT2kzRonqjXrKeSmC");

        var dimensions = {
            model: device.model,
            platform: device.platform
        };


        Parse.Analytics.track('appLaunch', dimensions);


        /* parsePlugin.initialize("jParK9CQZdIRCsZtJ4d3UR5s1HNcZZPUhXlBJ1BN", "TzibPeTYbJFepHLudcSTIePRjKU5N8b89e806YlH", function() {
        alert('success');
    }, function(e) {
        alert('error');
    });




    parsePlugin.subscribe('SampleChannel', function() {
        alert('OK');
    }, function(e) {
        alert('error');
    });*/


         parsePlugin.initialize("jParK9CQZdIRCsZtJ4d3UR5s1HNcZZPUhXlBJ1BN", "TzibPeTYbJFepHLudcSTIePRjKU5N8b89e806YlH", function() {

            parsePlugin.subscribe("allUsersNew", function() {

                parsePlugin.getInstallationId(function(id) {

                }, function(e) {
                   
                });

            }, function(e) {
               
            });

        }, function(e) {
          
        });



        //getRankings();






        $(document).on("touchstart", "#footer, .wcMenu", function() {
            $("#page").css("background-image", "none");
        });
        $("#page").scrollTop();
        $("#page").html("<h4>Loading...</h4><br>" + loader);
        setTimeout(function() {
            $("#page").html(injectHome).show();
        }, 500);
        currentPage = injectHome;
        $("#mainMenu").show();
        $("#footer").show();
        $("#brand").show();

        if (device.platform == "iOS") {
            $("#page").css("top", "90px");

            $("#wcLauncher").css("margin-top", "35px");
            $("#brand").css("padding-top", "35px");
            $("#brand").css("height", "90px");
            //$("#backer").css("margin-top", "25px");
        }



        $(".globalStatus").remove();



        $("#mainSpinner").carousel({
            interval: false
        });



    };

    init();

});