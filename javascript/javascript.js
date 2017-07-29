$(document).ready(function(){

	var btnArray = ["cat", "dog", "bird", "robot", "meme", "schrodinger", "physics"];
	var apiKey = "e3ab0c80ecfa4eca9110a6575e5098af";
	var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10&rating=g&q=";
	var gifObj;

	//dynamically create button on the HTML page
	function createButton(array) {

		var element = $("#buttons");
		element.empty();

		for (var i = 0; i < btnArray.length; i++) {

			element.append($("<button class='waves-effect waves-light btn choice'>" + btnArray[i] + "</button>"));

		}

	}

	//call createButton on BtnArray to create initial state of HTML
	createButton(btnArray);

	//call Giphy API to get gif when user clicked on buttons
	$(document).on("click", ".choice", function(){

		var tempUrl = queryUrl
		tempUrl += $(this).text();

		$.ajax({

			url: tempUrl,
			method:"GET",

		}).done(function (response){

			$('#gifs').empty();
			gifObj = response.data;
			updateGif(gifObj);

		});		

	});

	//create Gif cards 
	function updateGif(array) {

		for (var i = 0; i < array.length; i++) {

			var still = array[i].images.original_still.url;

			var animate = array[i].images.original.url;

			var rating = array[i].rating;

			var element = $("#gifs");

			element.append('<div class="row"><div class="col s6 m6 offset-m3 offset-s3"><div class="card center-align"><div class="card-image"><img src="' + still + '"><a class="btn-floating halfway-fab waves-effect waves-light red"><i data-state="still" data-still='+ still +' data-animate='+ animate +' class="material-icons play">play_arrow</i></a></div><div class="card-content"><p>' + 'Rating: ' + rating + '</p></div></div></div></div>');

		}


	}

	//when the play button is clicked, change img src depending on the class
	$(document).on("click", ".play", function(){

		var image = $(this).parent().parent().children().eq(0);
		var src;
		var state;

		if($(this).attr("data-state") === 'still'){

			src = $(this).attr("data-animate");
			state = "animate";

		} else {
			
			src = $(this).attr("data-still");
			state = "still";

		};

		image.attr("src", src);
		$(this).attr("data-state", state);

	});

	//when user click on add button, add a button to button div. Prompt user when inputted text is empty
	$("#add").on("click", function(){

		var addBtnTxt = $("#button_name").val();

		if (addBtnTxt === "") {

			$("#helperLabel").text("Can't be empty!");
			setTimeout(function(){

				$("#helperLabel").text("Text");

			}, 1000);

		} else {

			if (btnArray.indexOf(addBtnTxt) === -1){

				btnArray.push($("#button_name").val());

			};
		
		};
		
		createButton(btnArray);

	});


});