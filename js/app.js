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
    basicInfowindow = new google.maps.InfoWindow({
        // setcontent: contentString
    });
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
    //The below does not work for some reason.
    this.rating = venueArr[i];
};

function viewModel() {
    let self = this;
    self.placeList = ko.observableArray([]);
    self.keywordsList = ko.observableArray([
        'American', 'East Asian', 'Happy Hour']);
    self.markers = ko.observableArray([]);
    // Fill the placeList array.
    for(let i = 0; i < places.length; i++){
        self.placeList.push(new Place(i));
    }
    self.selectedFilter = ko.observable();
    // Filter function
    self.filterList = ko.computed(function() {
        if (!self.selectedFilter()) {
            return self.placeList();
        } else {
            return ko.utils.arrayFilter(self.placeList(), function(place) {
                return(place.keywords.indexOf(self.selectedFilter()) > -1);
            });
        }
    });

    self.updateTitleMarkers = function(listItem) {
        self.placeList().indexOf(listItem);
        listItem.marker.setVisible(true);
        listItem.marker.setAnimation(google.maps.Animation.DROP);
        self.placeList().forEach(function(element) {
            listItem.infowindow.setContent("<p>" + element.title + "</p>" + "<br>" + "<i class='fa fa-foursquare fa-1x' aria-hidden='true'></i>" + "  Foursquare Rating: " + element.rating);
        });
        listItem.infowindow.open(map, listItem.marker);
    }
}