var $breedSelect = document.querySelector('.breed-select');

var xhr = new XMLHttpRequest();
xhr.open('GET', ' https://api.thedogapi.com/v1/breeds');
xhr.responseType = 'json';
xhr.setRequestHeader('x-api-key', '7903dc02-5a8b-4378-b5b6-e81f1cbaac27');
xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.length; i++) {
    var option = document.createElement('option');
    option.textContent = xhr.response[i].name;
    $breedSelect.appendChild(option);
  }
});
xhr.send();
