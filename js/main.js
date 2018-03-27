// Location data for the application.
const places = [
    {title: 'Anantra Thai Restaurant', location: {lat: 34.169685, lng: -118.602510},  venueID: '56dbc184498e9f168e8e9fb9', keywords: ['East Asian']},
    {title: 'The Local Peasant', location: {lat: 34.165925, lng: -118.625338}, venueID: '518731b2498e4b3d522bdf8d', keywords: ['American', 'Happy Hour']},
    {title: 'The Slaw Dogs', location: {lat: 34.183946, lng: -118.604818}, venueID: '4e3aff891838961aff070536', keywords: ['American']},
    {title: 'Eureka!', location: {lat: 34.183962, lng: -118.605424}, venueID: '55ff3c76498ef77d5a6587c8', keywords: ['American', 'Happy Hour']},
    {title: 'Kabuki Japanese Restaurant', location: {lat: 34.166405, lng: -118.589749}, venueID: '4ae515e2f964a52048a021e3', keywords: ['East Asian', 'Happy Hour']},
];

// Functions to hide and show the side menu when hamburger icon is clicked.
function hideMenu() {
    document.getElementById("options-container").style.left = "-350px";
}

function showMenu() {
    document.getElementById("options-container").style.left = "0";
}

// FOURSQUARE API
const apiKey = 'DCQOD4KGBXCXC2WIJHU0TFO4BKDIHXE1YENFAMM1OCUHNO0Q';
const apiSecret = 'WFYXO1IHXL1APB3H3TEGUPYD24LU0C4Q42G14AUKO55JYMOX';

function fetchData(marker) {
        fetch('https://api.foursquare.com/v2/venues/' + marker.venueID + '?&client_id=' + apiKey + '&client_secret=' + apiSecret + '&v=20180126', {
            method: 'GET',
            dataType: 'jsonp',
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('There was a problem with the Foursquare API response: Error ' + response.status + '.');
        }).then(data => {
            console.log(data.response.venue);
            // These variables set up a photo to be stored.

            let photoPrefix = data.response.venue.bestPhoto.prefix;
            let photoSuffix = data.response.venue.bestPhoto.suffix;
            let size = "cap100";
            let bestPhoto = photoPrefix + size + photoSuffix;

            let prices = data.response.venue.price.message;

            // Convert fetched price message string into dollar symbols.
            if(prices === "Expensive") {
                prices = "$$$";
            }
            else if(prices === "Moderate") {
                prices = "$$";
            }
            else {
                prices = "$";
            }

            // Sets the content to each marker infowindow.
            return marker.content = `<p>${marker.title}</p> <br> <img src="${bestPhoto}"> <br> <i class='fa fa-foursquare fa-1x' aria-hidden='true'></i> Foursquare Rating:  ${data.response.venue.rating} <br> Prices: <p style="color:green; display:inline-block">${prices}</p>`;

        }).catch(error => {
            document.getElementById("fourSquare").innerHTML = "Foursquare API Error: " + error.message;
        });
}

function mapError() {
   document.getElementById("error-div").innerHTML = "There was an error loading the Google Maps API. Please try again later.";
}
