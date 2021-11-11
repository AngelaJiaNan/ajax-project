/* exported data */

var data = {
  view: 'breed-information',
  entry: null,
  selectedBreed: {},
  favorites: []
};

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('favbreed', dataJSON);
});

var previousDataJSON = localStorage.getItem('favbreed');

if (previousDataJSON) {
  data = JSON.parse(previousDataJSON);
}
