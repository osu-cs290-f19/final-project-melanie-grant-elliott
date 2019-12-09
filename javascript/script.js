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

      return await response; // parses JSON response into native JavaScript objects
}

// TODO: add event listener on modal "accept" button that takes the fields,
// wraps them in a POST request to /cat-spotting, and then clears them, closing the modal.
// use the createNewCat(...) function to send a POST request

// TODO: add event listener on modal "cancel" button that clears the fields,
// closes the modal, and removes the last placed marker (as we are not going through with the new cat)
// use map.removeLayer(markersList[markersList.length-1]) to remove the last marker