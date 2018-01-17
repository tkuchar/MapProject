/* Main Javascript File */

// Location data for app.
let places = [
    {title: 'The Local Peasant', location: {lat: 34.165925, lng: -118.625338}, keywords: ['American']},
    {title: 'The Slaw Dogs', location: {lat: 34.183946, lng: -118.604818}, keywords: ['American']},
    {title: 'Eureka!', location: {lat: 34.183962, lng: -118.605424}, keywords: ['American']},
    {title: 'Kabuki Japanese Restaurant', location: {lat: 34.166405, lng: -118.589749}, keywords: ['East Asian']},
    {title: 'Anantra Thai Restaurant', location: {lat: 34.169685, lng: -118.602510}, keywords: ['East Asian']},
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
            id: i
        });
        markers.push(marker);

        marker.addListener('click', function() {
            basicInfowindow.setContent(places[i].title);
            basicInfowindow.open(map, marker);
        });
    };
};

function hideMenu() {
    document.getElementById("options-container").setAttribute("class","hide-class");
};

// FOURSQUARE API key.
// Client ID: DX3A3OBAMQVOA3O4FCT5HI25FNKZ2C1FVE3SKQOVDEUR5W05
// Client Secret: 0X34REUZCI4ICN24NUET4BF2YEACJXZLBEZSBKDVJ1SAWHWD

// Use fetch.
const apiKey = 'DX3A3OBAMQVOA3O4FCT5HI25FNKZ2C1FVE3SKQOVDEUR5W05';
const apiSecret = '0X34REUZCI4ICN24NUET4BF2YEACJXZLBEZSBKDVJ1SAWHWD';
let result = '';

fetch('https://api.foursquare.com/v2/venues/search?ll=34.178,-118.612&client_id=' + apiKey +'&client_secret='+ apiSecret +'&v=20180115', {
    method: 'GET',
    /*headers: {
        client_id: apiKey,
        client_secret: apiSecret,
    },*/
    dataType: 'jsonp'
}).then(function(response){
    if (response.ok) {
        result = response.json();
        return result;
    }
    throw new Error('Network response is not ok. Error: ' + response.status);
}).catch(function(error) {
    console.log('There was a problem with the fetch response: ' + error.message);
}).then(function(result){
    // do something else with response data
});

// Create filter functions