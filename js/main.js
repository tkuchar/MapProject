/* Main Javascript File */

// Location data for app.
let places = [
    {title: 'The Local Peasant', location: {lat: 34.165925, lng: -118.625338}, venueID: '518731b2498e4b3d522bdf8d', keywords: ['American', 'Happy Hour']},
    {title: 'The Slaw Dogs', location: {lat: 34.183946, lng: -118.604818}, venueID: '4e3aff891838961aff070536', keywords: ['American']},
    {title: 'Eureka!', location: {lat: 34.183962, lng: -118.605424}, venueID: '55ff3c76498ef77d5a6587c8', keywords: ['American', 'Happy Hour']},
    {title: 'Kabuki Japanese Restaurant', location: {lat: 34.166405, lng: -118.589749}, venueID: '4ae515e2f964a52048a021e3', keywords: ['East Asian', 'Happy Hour']},
    {title: 'Anantra Thai Restaurant', location: {lat: 34.169685, lng: -118.602510},  venueID: '56dbc184498e9f168e8e9fb9', keywords: ['East Asian']},
];

function addMarkers() {

    for (let i = 0; i < places.length; i++) {
        var title = places[i].title;
        var position = places[i].location;
        // Initialize markers.
        let marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
        });
        markers.push(marker);

        marker.addListener('click', function() {
            basicInfowindow.setContent(places[i].title);
            basicInfowindow.open(map, marker);
        });
    };
};

// Incomplete function for hiding menu.
function hideMenu() {
    document.getElementById("options-container").setAttribute("class","hide-class");
};

// FOURSQUARE API
// Client ID: DX3A3OBAMQVOA3O4FCT5HI25FNKZ2C1FVE3SKQOVDEUR5W05
// Client Secret: 0X34REUZCI4ICN24NUET4BF2YEACJXZLBEZSBKDVJ1SAWHWD
const apiKey = 'DX3A3OBAMQVOA3O4FCT5HI25FNKZ2C1FVE3SKQOVDEUR5W05';
const apiSecret = '0X34REUZCI4ICN24NUET4BF2YEACJXZLBEZSBKDVJ1SAWHWD';
let result = [];
// Holds Foursquare venue data.
let venueArr = new Array();

function fetchData() {
    for (i = 0; i < places.length; i++) {
        fetch('https://api.foursquare.com/v2/venues/' + places[i].venueID + '?&client_id=' + apiKey + '&client_secret=' + apiSecret + '&v=20180115', {
            method: 'GET',
            dataType: 'jsonp',
        }).then(function(response) {
            if (response.ok) {
                result = response.json();
                return result;
            }
            throw new Error('There was a problem with the Foursquare API response: Error ' + response.status + '.');
        }).catch(function(error) {
            document.getElementById("fourSquare").innerHTML = error.message;
        }).then(pushVenueData);
    };
};

function pushVenueData(data) {
    venueArr.push(data.response.venue);
    // Test
    document.getElementById('fourSquare').innerHTML = "Foursquare API Test: " +
    venueArr[1].name + ", " + venueArr[1].rating;
};

fetchData();

// TODO: Create filter functions
function filterTest(){
    // do something
};