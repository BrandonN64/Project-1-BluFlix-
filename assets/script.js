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
  for(var i = 0; i < document.getElementsByTagName("section").length; i++){
    document.getElementsByTagName('section')[i].style.display = 'none';
  };
  document.getElementById('random-movie-section').style.display = "block";
}
var buttonClickHandler = function(event) {
	var genre = event.target.getAttribute('genre');
  console.log(genre)
}

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
var searchResult = document.getElementById('searchBar');
var movieOptions = [];
searchResult.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
  var searchInput = document.getElementById("searchBar").value;
  document.getElementsByTagName('section')
  if (document.getElementsByTagName('section')!== "")  {
    for (var i = 0; i < document.getElementsByTagName('section').length; i++)
    document.getElementsByTagName('section')[i].style.display = "none"
  }
  console.log(searchInput);
  document.getElementById('random-movie-section').style.display = "none";
  fetch("https://imdb-api.com/en/API/SearchMovie/k_bjfb6obj/" + searchInput)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    console.log(result.results[0].title)
    var resultLength = result.results.length
    console.log(resultLength)
    for(var i = 0; i < resultLength; i++){
     console.log(document.getElementsByTagName('section'))
     const sectionDiv = document.createElement ('section')
     const newDiv = document.createElement('div')
     const newContent = document.createTextNode(result.results[i].title)
     const movieTitle = document.createElement('header')
     newDiv.appendChild(newContent)
      newDiv.classList.add('w3-card-2', 'w3-padding-64', 'w3-margin', 'w3-col', 's2', 'w3-mobile', 'w3-center', 'searchMovie')
      sectionDiv.append(newDiv)
      document.body.appendChild(sectionDiv)
      console.log(i);
      newDiv.style.backgroundImage = "url('" + result.results[i].image + "')"
      newDiv.style.backgroundRepeat = "no-repeat"
      newDiv.style.backgroundClip = "padding-box"
      newDiv.style.backgroundSize = "contain"
    }
  }) 
  .catch(error => console.log('error', error));
  }
});

fetch('https://imdb-api.com/en/API/Top250Movies/k_bjfb6obj')
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data);
  
  var storeobjects = {
    objects: []
  }
  if(JSON.parse(localStorage.getItem('storedObjects')) !== null){
    var loadContents = JSON.parse(localStorage.getItem('storedObjects'));
    console.log(loadContents.objects.length);
    for(var i = 0; i < loadContents.objects.length; i++){
      storeobjects.objects.push(loadContents.objects[i]);
    }

    console.log(storeobjects.objects);
  }

  var movies = document.querySelectorAll('.movie');
  var randomMovies = document.querySelectorAll('.randomMovie');
  var myList = document.getElementById('myList');
  for(var i = 0; i < storeobjects.objects.length; i++){
    var myMovie = document.createElement('div');
    myMovie.setAttribute('class','w3-card-2 w3-col w3-padding-64 w3-margin s2 w3-mobile w3-center');
    var fullTitle = document.createElement('a');
    var imgEl = document.createElement('img');
    fullTitle.textContent = storeobjects.objects[i][0];
    fullTitle.style.display = 'block';
    imgEl.src = storeobjects.objects[i][1];
    fullTitle.setAttribute('href', 'https://www.imdb.com/title/' + storeobjects.objects[i][2]);
    fullTitle.setAttribute('target', '_blank');

    myMovie.append(imgEl);
    myMovie.append(fullTitle);
    myList.append(myMovie);
    
  }





  var index = 0;
  for(var i = 0; i < movies.length; i++){

    var fullTitle = document.createElement('a');
    var ratingHeading = document.createElement('p');
    var button  = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'w3-light-blue w3-text-white w3-hover-cyan');
    button.textContent = 'Add to list';
    var randomIndex = Math.floor(Math.random() * 249);
  
    fullTitle.textContent = data.items[randomIndex].title;
    fullTitle.style.display = 'block';
    fullTitle.setAttribute('href', 'https://www.imdb.com/title/' + data.items[randomIndex].id);
    fullTitle.setAttribute('target', '_blank');
    ratingHeading.textContent = data.items[randomIndex].imDbRating;
    
    movies[i].src = data.items[randomIndex].image;
    movies[i].style.width="100px";
    randomMovies[i].append(fullTitle);
    randomMovies[i].append(ratingHeading);
    randomMovies[i].append(button);
    randomMovies[i].style.display = 'table';
    randomMovies[i].setAttribute('style', 'overflow: auto');
    randomMovies[i].setAttribute('data-index', randomIndex);

    var myMovie = document.createElement('div');
    myMovie.setAttribute('class','w3-card-2 w3-col w3-padding-64 w3-margin s2 w3-mobile w3-center');
    myMovie.setAttribute('data-index', randomIndex);
    button.addEventListener('click', function(){
      storeobjects.objects.push([data.items[this.parentElement.getAttribute('data-index')].title, data.items[this.parentElement.getAttribute('data-index')].image, data.items[this.parentElement.getAttribute('data-index')].id]);
      localStorage.setItem('storedObjects',JSON.stringify(storeobjects));
      var myMovie = document.createElement('div');
      myMovie.setAttribute('class','w3-card-2 w3-col w3-padding-64 w3-margin s2 w3-mobile w3-center');
      var fullTitle = document.createElement('a');
      var imgEl = document.createElement('img');
      fullTitle.textContent = storeobjects.objects[index][0];
      fullTitle.style.display = 'block';
      imgEl.src = storeobjects.objects[index][1];
      fullTitle.setAttribute('href', 'https://www.imdb.com/title/' + storeobjects.objects[index][2]);
      fullTitle.setAttribute('target', '_blank');
  
      myMovie.append(imgEl);
      myMovie.append(fullTitle);
      myList.append(myMovie);
      index++;
    });
    
  

  }
});
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
      hours:'11am to 10pm'
    },
    {
      name: 'Cinemark Buckland Hills 18 and IMAX',
      location: {lat:41.801041, lng:-72.547752},
      hours:'10am to 11pm'
    },
    {
      name: 'AMC Plainville 20',
      location: {lat:41.676571, lng:-72.841614},
      hours:'11am to 11pm'
    },
    {
      name: 'Metro Movies 12',
      location: {lat:41.558281, lng:-72.648193},
      hours:'11am to 10pm'
    },
    {
      name: 'FunFlicks of Connecticut',
      location: {lat:41.715570, lng:-72.667510},
      hours:'10am to 4pm'
    },
    {
      name: 'Apple Cinemas Simsbury 8',
      location: {lat:41.817379, lng:-72.865067},
      hours:'12pm to 9pm'
    },
    {
      name: 'Holiday Cinemas Stadium 14',
      location: {lat:41.487640, lng:-72.808060},
      hours:'11am to 10pm'
    },
    {
      name: 'AMC Southington 12',
      location: {lat:41.565540, lng:-72.908070},
      hours:'11am to 11pm'
    },
    {
      name: 'Apple Cinemas Waterbury',
      location: {lat:41.564892, lng:-73.007080},
      hours:'12pm to 9pm'
    },
    {
      name: 'Mansfield Movieplex 8',
      location: {lat:41.754410, lng:-72.193120},
      hours:'12pm to 9pm'
    },
    {
      name: 'Agawam Cinemas',
      location: {lat:42.060070, lng:-72.632460},
      hours:'10am to 8pm'
    },
    {
      name: 'Apple Cinemas Barkhamsted 9',
      location: {lat:41.817379, lng:-72.865067},
      hours:'12pm to 9pm'
    },
    {
      name: 'Cinemark West Springfield 15',
      location: {lat:42.128580, lng:-72.630060},
      hours:'10am to 11pm'
    },
    {
      name: 'Cinemark North Haven',
      location: {lat:41.359180, lng:-72.873848},
      hours:'10am to 11pm'
    },
    {
      name: 'Marquee Cinemas',
      location: {lat:41.327461, lng:-72.879051},
      hours:'12pm to 7pm'
    },
    {
      name: 'Gilson Cafe & Cinema',
      location: {lat:41.921330, lng:-73.069510},
      hours:'6pm to 9pm'
    }
  ]
	theaters.forEach(function(theater){
		marktheater(theater);
	});

}
