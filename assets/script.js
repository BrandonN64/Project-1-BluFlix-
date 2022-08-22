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
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch('https://imdb-api.com/en/API/Top250Movies/k_va4qdhl7')
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data);
  
  var movies = document.querySelectorAll('.movie');
  console.log(movies.length);
  var randomMovies = document.querySelectorAll('.randomMovie');
  for(var i = 0; i < movies.length; i++){

    var fullTitle = document.createElement('a');
    var ratingHeading = document.createElement('p');
    var button  = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'w3-light-blue w3-text-white w3-hover-cyan');
    button.textContent = 'Add to list';
    var randomIndex = Math.floor(Math.random() * 249);
  
    console.log(data.items[randomIndex].fullTitle);
    fullTitle.textContent = data.items[randomIndex].title;
    fullTitle.style.display = 'block';
    fullTitle.setAttribute('href', 'https://www.imdb.com/title/' + data.items[randomIndex].id);
    ratingHeading.textContent = data.items[randomIndex].imDbRating;
    var icon = document.createElement('i');
    icon.setAttribute('class', 'fa fa-star');
    ratingHeading.append(icon);
    
    movies[i].src = data.items[randomIndex].image;
    randomMovies[i].append(fullTitle);
    randomMovies[i].append(ratingHeading);
    randomMovies[i].append(button);
    randomMovies[i].style.display = 'table';
    randomMovies[i].setAttribute('style', 'overflow: auto');
  

  }
});
 
// fetch('https://imdb-api.com/en/API/Title/k_9fv35bw7/tt1832382', requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// genreButtonsEl.addEventListener('click', buttonClickHandler)