$(document).ready(function () {

    var topics = [
        "tati",
        "wine",
        "greys anatomy",
        "hippie",
        "steel panther",
        "muse",
        "flying first class",
        "tap dancing",
        "harry potter",
        "the beach",
        "makeup",
    ];

    var renderButtons = function() {
        for (i = 0; i < topics.length; i++) {
            $("#buttonville").append(`<button class="btn btn-sm btn-dark giphy-button" data-subject="${topics[i]}">${topics[i]}</button>`)
        }
    }

    renderButtons();

    // clicking/submitting the #magic-maker
    $("#magic-maker").click(function() {
        event.preventDefault();
        var newTopic = $("#topic").val().trim();
        topics.push(newTopic);
        $("#buttonville").empty();
        renderButtons();

    })

    // clicking any giphy buttons
    $("#buttonville").on("click", ".giphy-button", function () {
        $("#gif-catcher").empty();
        console.log('how man times????');
        var giphySubject = $(this).attr("data-subject"),
            queryURL = `https://api.giphy.com/v1/gifs/search?q=${giphySubject}&api_key=1lQHsuUDCMrbyRsZgOW4Hpi6ug0A6kCT&limit=10`;
        console.log(queryURL)

        //AJAX request to giphy
        $.ajax({
            headers:{Accept:'*'},
            url: queryURL,
            method: "GET",
            // crossDomain: true,
            // dataType: 'jsonp',
            // responseType:'application/json',
        }).done(function (response, err) {
            
            for (i = 0; i < response.data.length; i++) {
                $("#gif-catcher").append(`
                <div class="each-gif">
                <img src="${response.data[i].images.fixed_height_still.url}" data-still="${response.data[i].images.fixed_height_still.url}" data-animate="${response.data[i].images.fixed_height.url}" data-state="still" class="gif" alt="${response.data[i].title}">
                <p>Rating: ${response.data[i].rating.toUpperCase()}</p>
                </div>`);
            }
        
       
        })
    });

    // click a gif to animate, or make still
    $("#gif-catcher").on("click", "img", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});