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

  //handler for modal accept button being clicked
  function handleAcceptButtonClick(event){
  }
