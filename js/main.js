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
            basicInfowindow.setContent(places[i].title + "<br>" + "Foursquare Rating: " + venueArr[i].rating);
            basicInfowindow.open(map, marker);
        });
    };
};

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[name="place-list"]').addEventListener("change", updateTitleMarkers);
    document.querySelector('select[name="keywords"]').addEventListener("change", updateKeywordMarkers);
}, false);

function updateTitleMarkers() {

    let list = vm.placeList();

    for(let i = 0; i < list.length; i++) {
        let found = (list[i].title.indexOf(event.target.value) > -1);
        if (found) {
            list[i].marker.setMap(map);
        }
        else
            list[i].marker.setMap(null);
    };
};

function updateKeywordMarkers() {

    let list = vm.placeList();

    for(let i = 0; i < list.length; i++) {
        let found = (list[i].keywords.indexOf(event.target.value) > -1);
        if (found) {
            list[i].marker.setMap(map);
        }
        else
            list[i].marker.setMap(null);
    };
};

// Incomplete function for hiding menu.
function hideMenu() {
    document.getElementById("options-container").setAttribute("class","hide-class");
};

// FOURSQUARE API
// Client ID: 4GNQBEWBAOPYM0DFVT0YEKXLMM3IRJAQ2ZAKIDNKL0NRN2DS
// Client Secret: 501HKFNFAMUIILHMN3SKKU1G0MN3TDZP1RI320VCO0VZ4WR3
const apiKey = '4GNQBEWBAOPYM0DFVT0YEKXLMM3IRJAQ2ZAKIDNKL0NRN2DS';
const apiSecret = '2W2A1PSSJIO5PMX0D3CXTYM3DY2M20AYLXPBYMZEHYLY0TMK';

function fetchData() {
    for (i = 0; i < places.length; i++) {
        fetch('https://api.foursquare.com/v2/venues/' + places[i].venueID + '?&client_id=' + apiKey + '&client_secret=' + apiSecret + '&v=20180125', {
            method: 'GET',
            dataType: 'jsonp',
        }).then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('There was a problem with the Foursquare API response: Error ' + response.status + '.');
        }).then(function(data){
            venueArr.push(data.response.venue);
        }).catch(function(error) {
            document.getElementById("fourSquare").innerHTML = "Foursquare API Error: " + error.message;
        });
    };
};