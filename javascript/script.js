let oregonStateCoordinates = [44.5638, -123.2794];

let catIcon = L.icon({
    iconUrl: 'cathead.svg',
    iconSize: [30, 30]
});

let map = tomtom.L.map('map', {
    key: API_KEY,
    basePath: '<sdk>',
    center: oregonStateCoordinates,
    zoom : 15,
});

map.addEventListener('click', (event) => {
    // Add new marker to map
    let addNewMarker = tomtom.L.marker(event.latlng, {icon: catIcon});
    addNewMarker.addTo(map);
    addNewMarker.addEventListener('click', handleMarkerClick);
    markersList.push(addNewMarker);

    // TODO: upon clicking on the map and adding a marker, the modal should appear
});

// Creates a new cat in the database. Example call:
// createNewCat(44.5125,-123.2691,"white","high","shy");
async function createNewCat(rlat, rlong, rcolor, renergy, rsociability){

    let postData = {
        lat : rlat,
        long : rlong,
        color : rcolor,
        energy : renergy,
        sociability : rsociability
    };

    // Default options are marked with *
    const response = await fetch('./cat-spotting', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(postData) // body data type must match "Content-Type" header
      });

//^^ Map API Junk

function insertNewCat(image, title, color, kindness, address){
  var photoCardTemplate = Handlebars.templates.photocard;
  var newPhotoCardHTML = photoCardTemplate({
    image: image,
    title: title,
    color: color,
    kindness: kindness,
    address: address
  })
  var photoCardContainer = document.querySelector('#cat-tivity');
  photoCardContainer.insertAdjacentHTML('beforeend', newPhotoCardHTML);
}

// TODO: add event listener on modal "accept" button that takes the fields,
// wraps them in a POST request to /cat-spotting, and then clears them, closing the modal.
// use the createNewCat(...) function to send a POST request

// TODO: add event listener on modal "cancel" button that clears the fields,
// closes the modal, and removes the last placed marker (as we are not going through with the new cat)
// use map.removeLayer(markersList[markersList.length-1]) to remove the last marker
