var searchInput = document.getElementById("searchBar").value;
var genreButtonsEl = document.querySelector("#genre-buttons");
function dynamicHamburger() {
  var x = document.getElementById("hamburger");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

function navBarOptions(navBarButton) {
  var i;
  var x = document.getElementsByClassName("navBar");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(navBarButton).style.display = "block";
  document.getElementById('random-movie-section').style.display = "none";
}

function randomMoviesSpan() {
  document.getElementById('Movies').style.display = 'none';
  document.getElementById('myList').style.display = 'none';
  document.getElementById('Genres').style.display = 'none';
  document.getElementById('random-movie-section').style.display = "block";
}
var buttonClickHandler = function(event) {
	var genre = event.target.getAttribute('genre');
  console.log(genre)
}
function initMap() {
	var myMapCenter = { lat: 41.700540, lng: -72.559270 };

	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
		zoom: 9
	});

	function marktheater(theaterInfo){

    const icon = {
      url: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/movie_pinlet.svg", // url
      scaledSize: new google.maps.Size(25, 25), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0)
    };

		// Create a marker and set its position.
		var marker = new google.maps.Marker({
			map: map,
			position: theaterInfo.location,
			title: theaterInfo.name,
      icon: icon
		});

		// show theater info when marker is clicked
		marker.addListener('click', function(){
			showtheaterInfo(theaterInfo);
		});
	}

	// show theater info in text box
	function showtheaterInfo(theaterInfo){
		var info_div = document.getElementById('info_div');
		info_div.innerHTML = 'Theater Name: '
			+ theaterInfo.name
			+ '<br>Hours: ' + theaterInfo.hours;
	}
  var theaters = [
    {
      name: 'Art Cinema',
      location: {lat:41.743630, lng:-72.676730},
      hours:'12pm to 9pm'
    },
    {
      name: 'Apple Cinemas Xtreme',
      location: {lat:41.747246, lng:-72.712448},
      hours:'11am to 10pm'
    },
    {
      name: 'Apple Cinemas Luxury',
      location: {lat:41.762770, lng:-72.671250},
      hours:'12pm to 11:30pm'
    },
    {
      name: 'Cinépolis Luxury Cinemas',
      location: {lat:41.760200, lng:-72.742040},
      hours:'3pm to 11pm'
    },
    {
      name: 'Picture Show Berlin',
      location: {lat:41.629181, lng:-72.742882},
      hours:'10am to 11pm'
    },
    {
      name: 'Parkade Cinemas and Entertainment',
      location: {lat:41.780609, lng:-72.541832},
      hours:''
    },
    {
      name: 'Cinemark Buckland Hills 18 and IMAX',
      location: {lat:41.801041, lng:-72.547752},
      hours:''
    },
    {
      name: 'AMC Plainville 20',
      location: {lat:41.676571, lng:-72.841614},
      hours:''
    },
    {
      name: 'Metro Movies 12',
      location: {lat:41.558281, lng:-72.648193},
      hours:''
    },
    {
      name: 'FunFlicks of Connecticut',
      location: {lat:41.715570, lng:-72.667510},
      hours:''
    },
    {
      name: 'Apple Cinemas Simsbury 8',
      location: {lat:41.817379, lng:-72.865067},
      hours:''
    },
    {
      name: 'Lincoln Theater',
      location: {lat:41.793789, lng:-72.716568},
      hours:''
    },
    {
      name: 'Holiday Cinemas Stadium 14',
      location: {lat:41.487640, lng:-72.808060},
      hours:''
    },
    {
      name: 'AMC Southington 12',
      location: {lat:41.565540, lng:-72.908070},
      hours:''
    },
    {
      name: 'Apple Cinemas Waterbury',
      location: {lat:41.564892, lng:-73.007080},
      hours:''
    },
    {
      name: 'Mansfield Movieplex 8',
      location: {lat:41.754410, lng:-72.193120},
      hours:''
    },
    {
      name: 'Agawam Cinemas',
      location: {lat:42.060070, lng:-72.632460},
      hours:''
    },
    {
      name: 'Apple Cinemas Barkhamsted 9',
      location: {lat:41.817379, lng:-72.865067},
      hours:''
    },
    {
      name: 'Cinemark West Springfield 15',
      location: {lat:42.128580, lng:-72.630060},
      hours:''
    },
    {
      name: 'Cinemark North Haven',
      location: {lat:41.359180, lng:-72.873848},
      hours:''
    },
    {
      name: 'Cine 4',
      location: {lat:41.327461, lng:-72.879051},
      hours:''
    },
    {
      name: 'Marquee Cinemas',
      location: {lat:41.327461, lng:-72.879051},
      hours:''
    },
    {
      name: 'Gilson Cafe & Cinema',
      location: {lat:41.921330, lng:-73.069510},
      hours:''
    }
  ]
	theaters.forEach(function(theater){
		marktheater(theater);
	});

}