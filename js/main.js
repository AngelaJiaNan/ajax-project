var $breedSelect = document.querySelector('.breed-select');
var $columnImg = document.querySelector('.column-half-img');
var $breedinfor = document.querySelector('.breed-infor');
var $searchForm = document.querySelector('#search-page');
var $breedininforPage = document.querySelector('#breedininfor-page');
var $favoritesPageHid = document.querySelector('#fav-list');
var $addFavorite = document.querySelector('.add-fav');
var $favbreedtext = document.querySelector('.fav-breed');
var $views = document.querySelectorAll('.view');
var $navbar = document.querySelector('.nav');

var xhr = new XMLHttpRequest();
xhr.open('GET', ' https://api.thedogapi.com/v1/breeds');
xhr.responseType = 'json';
xhr.setRequestHeader('x-api-key', '7903dc02-5a8b-4378-b5b6-e81f1cbaac27');
xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.length; i++) {
    // console.log(xhr.response);
    // console.log(xhr.status);
    var option = document.createElement('option');
    option.setAttribute('value', xhr.response[i].name);
    option.textContent = xhr.response[i].name;
    $breedSelect.appendChild(option);
  }
});
xhr.send();

function generateLi(breed) {
  var breedImg = document.createElement('img');
  breedImg.setAttribute('class', 'breedimg');
  breedImg.setAttribute('src', breed.image.url);
  $columnImg.appendChild(breedImg);

  var li = document.createElement('li');
  li.setAttribute('class', 'breed-fact');

  var breedName = document.createElement('h4');
  breedName.textContent = breed.name;
  li.appendChild(breedName);

  var breedFor = document.createElement('p');
  breedFor.textContent = 'Breed For: ' + breed.bred_for;
  li.appendChild(breedFor);

  var breedGroup = document.createElement('p');
  breedGroup.textContent = 'Breed Group: ' + breed.breed_group;
  li.appendChild(breedGroup);

  var breedWeight = document.createElement('p');
  breedWeight.textContent = 'Weight: ' + breed.weight.imperial;
  li.appendChild(breedWeight);

  var breedHeight = document.createElement('p');
  breedHeight.textContent = 'Height: ' + breed.height.imperial;
  li.appendChild(breedHeight);

  var breedLifespan = document.createElement('p');
  breedLifespan.textContent = 'Life-span: ' + breed.life_span;
  li.appendChild(breedLifespan);

  var breedTemperament = document.createElement('p');
  breedTemperament.textContent = 'Temperament: ' + breed.temperament;
  li.appendChild(breedTemperament);
  return li;
}

$breedSelect.addEventListener('change', function (event) {
  $searchForm.classList.remove('search-page');
  $searchForm.classList.add('hidden');
  $breedininforPage.className = ' ';

  for (var i = 0; i < xhr.response.length; i++) {
    if (event.target.value === xhr.response[i].name) {
      var li = generateLi(xhr.response[i]);
      $breedinfor.appendChild(li);
      data.selectedBreed = xhr.response[i];
    }
  }
});

$addFavorite.addEventListener('click', function (event) {
  event.preventDefault();
  $breedininforPage.classList.add('hidden');
  $favoritesPageHid.className = ' ';
  data.favorites.push(data.selectedBreed);

  for (var i = 0; i < data.favorites.length; i++) {
    generatefavLi(data.favorites[i]);
  }
});

function generatefavLi(currentbreed) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');

  var favbreedImg = document.createElement('img');
  favbreedImg.setAttribute('class', 'breedimg');
  favbreedImg.setAttribute('src', currentbreed.image.url);
  columnHalf.appendChild(favbreedImg);
  li.appendChild(columnHalf);

  var columnRightHalf = document.createElement('div');
  columnRightHalf.setAttribute('class', 'column-half');

  var deleteBtn = document.createElement('i');
  deleteBtn.setAttribute('class', 'fas fa-times');
  columnRightHalf.appendChild(deleteBtn);
  var $modal = document.querySelector('.modal');
  deleteBtn.addEventListener('click', function (event) {
    $modal.className = 'modal show';
  });

  var favbreedName = document.createElement('h5');
  favbreedName.textContent = currentbreed.name;
  columnRightHalf.appendChild(favbreedName);
  li.appendChild(columnRightHalf);

  $favbreedtext.appendChild(li);
  return li;
}

$navbar.addEventListener('click', function (event) {
  event.preventDefault();
  var viewName = event.target.getAttribute('data-view');

  for (var viewIndex = 0; viewIndex < $views.length; viewIndex++) {
    if ($views[viewIndex].getAttribute('data-view') !== viewName) {
      $views[viewIndex].className = 'view hidden';
    } else {
      $views[viewIndex].className = 'view';
    }
  }
});
