const $breedSelect = document.querySelector('.breed-select');
const $columnImg = document.querySelector('.column-half-img');
const $breedinfor = document.querySelector('.breed-infor');
const $searchForm = document.querySelector('#search-page');
const $breedininforPage = document.querySelector('#breedininfor-page');
const $favoritesPageHid = document.querySelector('#fav-list');
const $addFavorite = document.querySelector('.add-fav');
const $favbreedtext = document.querySelector('.fav-breed');
const $views = document.querySelectorAll('.view');
const $navbar = document.querySelector('.nav');

const xhr = new XMLHttpRequest();
xhr.open('GET', ' https://api.thedogapi.com/v1/breeds');
xhr.responseType = 'json';
xhr.setRequestHeader('x-api-key', '7903dc02-5a8b-4378-b5b6-e81f1cbaac27');
xhr.addEventListener('load', function () {
  for (let i = 0; i < xhr.response.length; i++) {
    // console.log(xhr.response);
    // console.log(xhr.status);
    const option = document.createElement('option');
    option.setAttribute('value', xhr.response[i].name);
    option.textContent = xhr.response[i].name;
    $breedSelect.appendChild(option);
  }
});
xhr.send();

function generateLi(breed) {
  const breedImg = document.createElement('img');
  breedImg.setAttribute('class', 'breedimg');
  breedImg.setAttribute('src', breed.image.url);
  $columnImg.appendChild(breedImg);

  const li = document.createElement('li');
  li.setAttribute('class', 'breed-fact');

  const breedName = document.createElement('h4');
  breedName.textContent = breed.name;
  li.appendChild(breedName);

  const breedFor = document.createElement('p');
  breedFor.textContent = 'Breed For: ' + breed.bred_for;
  li.appendChild(breedFor);

  const breedGroup = document.createElement('p');
  breedGroup.textContent = 'Breed Group: ' + breed.breed_group;
  li.appendChild(breedGroup);

  const breedWeight = document.createElement('p');
  breedWeight.textContent = 'Weight: ' + breed.weight.imperial;
  li.appendChild(breedWeight);

  const breedHeight = document.createElement('p');
  breedHeight.textContent = 'Height: ' + breed.height.imperial;
  li.appendChild(breedHeight);

  const breedLifespan = document.createElement('p');
  breedLifespan.textContent = 'Life-span: ' + breed.life_span;
  li.appendChild(breedLifespan);

  const breedTemperament = document.createElement('p');
  breedTemperament.textContent = 'Temperament: ' + breed.temperament;
  li.appendChild(breedTemperament);
  return li;
}

$breedSelect.addEventListener('change', function (event) {

  $searchForm.classList.remove('search-page');
  $searchForm.classList.add('hidden');
  $breedininforPage.className = ' ';

  for (let i = 0; i < xhr.response.length; i++) {
    if (event.target.value === xhr.response[i].name) {
      const li = generateLi(xhr.response[i]);
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

  for (let i = 0; i < data.favorites.length; i++) {
    generatefavLi(data.favorites[i]);
  }
});

var currentIdtoDelete = 0;
var $modal = document.querySelector('.modal');

function generatefavLi(currentbreed) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');
  li.setAttribute('data-entry-id', currentbreed.id);

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
  deleteBtn.setAttribute('data-entry-id', currentbreed.id);
  columnRightHalf.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', function (event) {
    currentIdtoDelete = event.target.attributes[1].value;
    $modal.className = 'modal show';
  });

  const favbreedName = document.createElement('h5');
  favbreedName.textContent = currentbreed.name;
  columnRightHalf.appendChild(favbreedName);

  const commentForm = document.createElement('form');

  const commentBox = document.createElement('textarea');
  commentBox.setAttribute('class', 'text');
  commentForm.appendChild(commentBox);

  const addComment = document.createElement('button');
  addComment.setAttribute('class', 'addBTN');
  addComment.setAttribute('type', 'submit');
  addComment.textContent = 'Add Comment';

  commentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const commentText = document.createElement('p');
    commentText.setAttribute('class', 'inputComment');
    commentText.textContent = commentForm.elements[0].value;
    columnRightHalf.appendChild(commentText);
    commentForm.classList.add('hidden');
  });

  commentForm.appendChild(addComment);

  columnRightHalf.appendChild(commentForm);

  li.appendChild(columnRightHalf);

  $favbreedtext.appendChild(li);
  return li;
}

const $noBTN = document.querySelector('#no-btn');
$noBTN.addEventListener('click', function (event) {
  event.preventDefault();
  $modal.className = 'modal hidden';
});

const $yesBTN = document.querySelector('#yes-btn');
$yesBTN.addEventListener('click', function (event) {
  event.preventDefault();
  $modal.className = 'modal hidden';
  const liToRemove = document.querySelector(`[data-entry-id="${currentIdtoDelete}"]`);
  for (let i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i].id === parseInt(currentIdtoDelete)) {
      data.favorites.splice(i, 1);
    }
  }
  liToRemove.remove();
});

$navbar.addEventListener('click', function (event) {
  event.preventDefault();
  const viewName = event.target.getAttribute('data-view');

  for (let viewIndex = 0; viewIndex < $views.length; viewIndex++) {
    if ($views[viewIndex].getAttribute('data-view') !== viewName) {
      $views[viewIndex].className = 'view hidden';
    } else {
      $views[viewIndex].className = 'view';
    }
  }
});
