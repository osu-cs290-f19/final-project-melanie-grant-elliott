let oregonStateCoordinates = [44.5638, -123.2794];

let catIcon = L.icon({
    iconUrl: 'cathead.svg',
    iconSize: [30, 30]
});

let map = tomtom.L.map('map', {
    key: "placeholder key",
    basePath: '<sdk>',
    center: oregonStateCoordinates,
    zoom : 15,
});

map.addEventListener('click', (event) => {
    tomtom.L.marker(event.latlng).addTo(map);
});