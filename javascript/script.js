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
    tomtom.L.marker(event.latlng).addTo(map);
    menu.style.display = 'block';
    catMod.style.display = 'block';
});

//This is where my stuff lives
//variables
var menu = document.getElementById('modal-backdrop');
var catMod = document.getElementById('add-cat-modal');
var button = document.getElementById('modal-open-button');
var button2 = document.getElementsByClassName('modal-hide-button');
var button3 = document.getElementById('modal-accept');
var modInp = document.getElementsByClassName('post-input-element');

 //listener for modal displaying button being clicked
console.log(button);
button.addEventListener('click', handleButtonClick);

//listener for modal closing button being clicked
for(var i = 0; i < button2.length; i++){
  button2[i].addEventListener('click', handleHideButtonClick);
}

//listener for modal accepting button being clicked
button3.addEventListener('click', handleAcceptButtonClick);

//handler for modal button being clicked
function handleButtonClick(event){
  console.log("== Modal button was clicked");
  menu.style.display = 'block';
  catMod.style.display = 'block';
}

function handleAcceptButtonClick(event){

}

 //handler for either the x or cancel button being clicked
function handleHideButtonClick(event) {
    menu.style.display = 'none';
    catMod.style.display = 'none';
    for(var i = 0; i < modInp.length; i++){
      for(var j = 0; j < modInp[i].children.length; j++){
        if(modInp[i].children[j].type == "text" || modInp[i].children[j].type == "number"){
         modInp[i].children[j].value = "";
       }
       if(modInp[i].children[j].type == "fieldset"){
         modInp[i].children[j].children[1].children[0].checked = true;
       }
     }
    }
}

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
}
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
