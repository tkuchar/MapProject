/* Application JS which contains MVVM */

// Global variables for app.
let map, basicInfowindow;
let markers = [];

function initMap() {
    // Initialize map.
    let WoodlandHills = {
        lat: 34.172846,
        lng: -118.612701
    }
    map = new google.maps.Map(document.getElementById("map"), {
        center: WoodlandHills,
        zoom: 13,
    });

    basicInfowindow = new google.maps.InfoWindow();
    // Initialize Markers.
    addMarkers();
};

let viewModel = function () {
    "use strict";
    let self = this;

    let Place = function(i) {
        this.title = places[i].title;
        this.location = places[i].locatin;
        // TODO: Add Foursquare info.
     };
    // TODO: Use knockout.js to access model and then data-bind to view.
    self.placeList = ko.observableArray();

    // Fill the placeList array.
    for(let i = 0; i < places.length; i++) {
        self.placeList.push(new Place(i));
    }
};
// Apply ko bindings.
ko.applyBindings(new viewModel());