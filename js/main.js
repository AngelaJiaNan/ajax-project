var $breedSelect = document.querySelector('.breed-select');
var $columnImg = document.querySelector('.column-half-img');
var $breedinfor = document.querySelector('.breed-infor');
var $searchForm = document.querySelector('.search-page');
var $breedininforPage = document.querySelector('.breedininfor-page');

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
  $searchForm.className = 'hidden';
  $breedininforPage.className = ' ';
  for (var i = 0; i < xhr.response.length; i++) {
    if (event.target.value === xhr.response[i].name) {
      var li = generateLi(xhr.response[i]);
      $breedinfor.appendChild(li);
    }
  }
});
