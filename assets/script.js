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

fetch('https://imdb-api.com/en/API/Top250Movies/k_6jj6674o')
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
 
// fetch('https://imdb-api.com/en/API/Title/k_9fv35bw7/tt1832382', requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// genreButtonsEl.addEventListener('click', buttonClickHandler)