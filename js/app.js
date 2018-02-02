/* Application JS which contains MVVM */

function initMap() {
    // Initialize map.
    let WoodlandHills = {
        lat: 34.172846,
        lng: -118.612701
    };
    map = new google.maps.Map(document.getElementById("map"), {
        center: WoodlandHills,
        zoom: 13,
    });

    basicInfowindow = new google.maps.InfoWindow();
    //Fetch Foursquare data.
    fetchData();
    // Initialize Markers.
    addMarkers();
    // Apply ko bindings.
    vm = new viewModel();
    ko.applyBindings(vm);
}

let Place = function(i) {
    this.title = places[i].title;
    this.location = places[i].location;
    this.marker = markers[i];
    this.keywords = places[i].keywords;
    this.infowindow = basicInfowindow;
};

function viewModel() {
    let self = this;
    self.placeList = ko.observableArray();
    self.keywordsList = ko.observableArray([
        'American', 'East Asian', 'Happy Hour']);
    self.markers = ko.observableArray();
    // Fill the placeList array.
    for(let i = 0; i < places.length; i++){
        self.placeList.push(new Place(i));
    }
    self.selectedPlace = ko.observable();
    self.selectedFilter = ko.observable();

}