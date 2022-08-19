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
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
 
fetch('https://imdb-api.com/en/API/Title/k_6jj6674o/tt1832382', requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
genreButtonsEl.addEventListener('click', buttonClickHandler)


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
  fetch("https://imdb-api.com/en/API/SearchMovie/k_6jj6674o/" + searchInput)
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
