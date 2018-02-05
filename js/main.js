// Location data for app.
let places = [
    {title: 'Anantra Thai Restaurant', location: {lat: 34.169685, lng: -118.602510},  venueID: '56dbc184498e9f168e8e9fb9', keywords: ['East Asian']},
    {title: 'The Local Peasant', location: {lat: 34.165925, lng: -118.625338}, venueID: '518731b2498e4b3d522bdf8d', keywords: ['American', 'Happy Hour']},
    {title: 'The Slaw Dogs', location: {lat: 34.183946, lng: -118.604818}, venueID: '4e3aff891838961aff070536', keywords: ['American']},
    {title: 'Eureka!', location: {lat: 34.183962, lng: -118.605424}, venueID: '55ff3c76498ef77d5a6587c8', keywords: ['American', 'Happy Hour']},
    {title: 'Kabuki Japanese Restaurant', location: {lat: 34.166405, lng: -118.589749}, venueID: '4ae515e2f964a52048a021e3', keywords: ['East Asian', 'Happy Hour']},
];

let map, basicInfowindow;
let markers = [];

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

        marker.addListener('click', function() {
            this.setAnimation(google.maps.Animation.BOUNCE);
            basicInfowindow.setContent("<p>" + places[i].title + "</p>" + "<br>" + "<i class='fa fa-foursquare fa-1x' aria-hidden='true'></i>" + "  Foursquare Rating: " + );
            basicInfowindow.open(map, marker);
            setTimeout(function(){
                marker.setAnimation(null);
            }, 2100);
        });

        markers.push(marker);
    }
}

function updateKeywordMarkers() {
    let list = vm.placeList();
    let filter = vm.selectedFilter();

    list.forEach(function(element){
        // Clear previously opened infowindows
        element.infowindow.close();
        let found = (element.keywords.indexOf(filter) > -1);
        if (found) {
            element.marker.setVisible(true)
            element.marker.setAnimation(google.maps.Animation.DROP);
        }
        else
            element.marker.setVisible(false)

        if (event.target.value === "") {
            element.marker.setVisible(true)
            element.marker.setAnimation(google.maps.Animation.DROP);
        }
    });
}

function hideMenu() {
    document.getElementById("options-container").style.display = "none";
}

function showMenu() {
    document.getElementById("options-container").style.display = "block";
}

// FOURSQUARE API
const apiKey = 'DCQOD4KGBXCXC2WIJHU0TFO4BKDIHXE1YENFAMM1OCUHNO0Q';
const apiSecret = 'WFYXO1IHXL1APB3H3TEGUPYD24LU0C4Q42G14AUKO55JYMOX';

function fetchData() {
        fetch('https://api.foursquare.com/v2/venues/' + element.venueID + '?&client_id=' + apiKey + '&client_secret=' + apiSecret + '&v=20180126', {
            method: 'GET',
            dataType: 'jsonp',
        }).then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('There was a problem with the Foursquare API response: Error ' + response.status + '.');
        }).then(function(data){
            return
        }).catch(function(error) {
            document.getElementById("fourSquare").innerHTML = "Foursquare API Error: " + error.message;
        });
}

function mapError() {
   document.getElementById("error-div").innerHTML = "There was an error loading the Google Maps API. Please try again later.";
}
