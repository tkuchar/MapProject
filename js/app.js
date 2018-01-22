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
    // Apply ko bindings.
    ko.applyBindings(new viewModel());
};

function viewModel() {
    "use strict";
    let self = this;

    let Place = function(i) {
        this.title = places[i].title;
        this.location = places[i].location;
        this.keywords = places[i].keywords;
        // TODO: Add Foursquare and ther info.
     };

    // TODO: Use knockout.js to access model and then data-bind to view.
    self.placeList = ko.observableArray();
    self.keywordsList = ko.observableArray([
        'American', 'East Asian', 'Happy Hour']);
    // Fill the placeList array.
    for(let i = 0; i < places.length; i++){
        self.placeList.push(new Place(i));
    };
};
