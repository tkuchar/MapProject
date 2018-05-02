/* Application JS which contains MVVM */

let map, basicInfowindow;

function initMap() {
    // Initialize map.
    const WoodlandHills = {
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

    // Apply Knockout bindings.
    vm = new viewModel();
    ko.applyBindings(vm);
}

// ECMAScript6 class function which is used to put Place objects into an observable array.
class Place {
    constructor(i) {
    const self = this;

    this.title = places[i].title;
    this.location = places[i].location;
    this.keywords = places[i].keywords;
    this.venueID = places[i].venueID;

    // Create marker
    self.marker = new google.maps.Marker({
        position: places[i].location,
        map: map,
        title: places[i].title,
        animation: google.maps.Animation.DROP,
        });

    // Fetch Foursquare data to set Infowindow content.
    fetchData(self);

    self.content = "";

    self.marker.addListener('click', function() {

        const marker = this;

        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null);
            }, 2100);

        basicInfowindow.setContent(self.content);
        basicInfowindow.open(map, marker);

    });

    basicInfowindow.setContent(self.content);
}
};

function viewModel() {

    let self = this;

    self.placeList = ko.observableArray([]);
    self.keywordsList = ko.observableArray([
        'American', 'East Asian', 'Happy Hour']);
    // Fill the placeList array.
    for(let i = 0; i < places.length; i++){
        self.placeList.push(new Place(i));
    }

    self.selectedFilter = ko.observable();

    // Filters the <li> elements based on filter selection.
    self.filterList = ko.computed(() => {
        if (!self.selectedFilter()) {
            return self.placeList();
        } else {
            return ko.utils.arrayFilter(self.placeList(), function(place) {
                return(place.keywords.indexOf(self.selectedFilter()) > -1);
            });
        }
    });

    // Updates the map marker when a list item is clicked in the menu.
    self.updateTitleMarkers = (listItem => {
        self.placeList().indexOf(listItem);
        listItem.marker.setVisible(true);
        listItem.marker.setAnimation(google.maps.Animation.DROP);
        basicInfowindow.setContent(listItem.content);
        basicInfowindow.open(map, listItem.marker);
    });

    // Updates the map markers when a filter is applied.
    self.updateMapMarkers = (e, event) => {
        self.placeList().forEach(element => {

            basicInfowindow.close();

            let found = (element.keywords.indexOf(self.selectedFilter()) > -1);
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
    };
}