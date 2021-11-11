/* exported data */

var data = {
  view: 'breed-information',
  entry: null,
  selectedBreed: {},
  favorites: []
};

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('breed', dataJSON);
});

var previousDataJSON = localStorage.getItem('breed');

if (previousDataJSON) {
  data = JSON.parse(previousDataJSON);
}
