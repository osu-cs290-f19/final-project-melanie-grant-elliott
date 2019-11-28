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
});

//^^ Map API Junk

var screenWidth = window.screen.width * window.devicePixelRatio;
var sideBar = document.getElementById('side-elements');
var clientWidth = window.innerWidth;
var sideBarWidth = screenWidth/5;

//Resizing map/sidebar for different window sizes
window.addEventListener('resize', function(event){
  clientWidth = window.innerWidth;
  document.getElementById('map').style.width = (((clientWidth-sideBarWidth)/clientWidth)*100)+"vw";
  sideBar.style.width = 100-(((clientWidth-sideBarWidth)/clientWidth)*100)+"vw"
  //if(window.screen.width < )
  //sideBar.style.width = width+"px";
  //document.getElementById('map').style.width = (document.clientWidth-width)+"px";
  console.log("window.outerWidth: ",window.innerWidth);
  console.log("window.screen.width * window.devicePixelRatio",window.screen.width * window.devicePixelRatio);

});
