/* Application JS which contains MVVM */
// Global variables for app.
let map, basicInfowindow;
let markers = [];
let venueArr = [];

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

    let contentString = "";
    basicInfowindow = new google.maps.InfoWindow({
        //content: contentString,
    });
    //Fetch Foursquare data.
    fetchData();
    // Initialize Markers.
    addMarkers();
    // Apply ko bindings.
    vm = new viewModel();
    ko.applyBindings(vm);
};

let Place = function(i) {
    this.title = places[i].title;
    this.location = places[i].location;
    this.marker = markers[i];
    this.keywords = places[i].keywords;
    this.infowindow = basicInfowindow;
    //this.rating = venueArr[i].rating;
    // TODO: Add Foursquare and other info.
};

function viewModel() {
    "use strict";
    let self = this;
    // TODO: Use knockout.js to access model and then data-bind to view.
    self.placeList = ko.observableArray();
    self.keywordsList = ko.observableArray([
        'American', 'East Asian', 'Happy Hour']);
    self.markers = ko.observableArray();
    // Fill the placeList array.
    for(let i = 0; i < places.length; i++){
        self.placeList.push(new Place(i));
    };
};