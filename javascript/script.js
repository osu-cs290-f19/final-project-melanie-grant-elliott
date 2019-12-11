let oregonStateCoordinates = [44.5638, -123.2794];

let catIcon = L.icon({
    iconUrl: './images/pin.png',
    iconSize: [25, 38.5]
});

let map = tomtom.L.map('map', {
    key: API_KEY,
    basePath: '<sdk>',
    center: oregonStateCoordinates,
    zoom : 15,
});

let markersList = [];

function handleMarkerClick(e) {
    e.target.openPopup();
 }

// All this giant chunk does is preload the map with cats spotted in the last 24 hours
fetch('./cat-locations')

  //grab the cats from the database
  .then((response) => {
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
    }
    return response.json();
    }
  )

  //add the cats to the map and fill their popups with their information
  .then((data) => {
      data.forEach((cat) => {
            latlng = [cat.lat, cat.long];
            let newMarker = tomtom.L.marker(latlng, {icon: catIcon});
            newMarker.addTo(map);
            newMarker.bindPopup(cat.color + " cat. Energy: " + cat.energy + ", Sociability: " + cat.sociability);
            markersList.push(newMarker);
        });
    }
  )

  //lastly, add click event listeners so that you can click on a cat to open the little popup
  .then(() =>
    {
        for (let i = 0; i < markersList.length; i++){
            console.log(markersList[i]);
            markersList[i].addEventListener('click', handleMarkerClick);
        }
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

// This adds new markers to the map when we click on it, and should bring up the modal as well
map.addEventListener('click', (event) => {
    // Add new marker to map
    let addNewMarker = tomtom.L.marker(event.latlng, {icon: catIcon});
    addNewMarker.addTo(map);
    addNewMarker.addEventListener('click', handleMarkerClick);
    markersList.push(addNewMarker);

    // TODO: upon clicking on the map and adding a marker, the modal should appear
});    

// Creates a new cat in the database. Example call:
//      createNewCat(44.5125,-123.2691,"white","high","shy");
// Automatically grabs whatever picture has been uploaded to the image input file
async function createNewCat(lat, long, color, energy, sociability){
    
    let input = document.querySelector('input[type="file"]');

    let data = new FormData();
    data.append('catImage', input.files[0]);
    data.append('lat', lat);
    data.append('long', long);
    data.append('color', color);
    data.append('energy', energy);
    data.append('sociability', sociability);

    // Default options are marked with *
    const response = await fetch('./cat-spotting', {
        method: 'POST', 
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: data
      });

      return await response; // parses JSON response into native JavaScript objects
}

// TODO: add event listener on modal "accept" button that takes the fields,
// wraps them in a POST request to /cat-spotting, and then clears them, closing the modal.

// TODO: add event listener on modal "cancel" button that clears the fields,
// closes the modal, and removes the last placed marker (as we are not going through with the new cat)
// use map.removeLayer(markersList[markersList.length-1]) to remove the last marker