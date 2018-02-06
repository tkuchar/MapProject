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

    vm = new viewModel();
    ko.applyBindings(vm);
}

let Place = function(i) {

    const self = this;

    this.title = places[i].title;
    this.location = places[i].location;
    this.keywords = places[i].keywords;
    this.venueID = places[i].venueID;

    // Create marker
    self.marker = new google.maps.Marker({
        position: places[i].position,
        map: map,
        title: places[i].title,
        animation: google.maps.Animation.DROP,
        });

    self.content = '<p' + self.title + '<p>' + '<br>' + "<i class='fa fa-foursquare fa-1x' aria-hidden='true'></i>" + '  Foursquare Rating: Unavailable';

    self.marker.addListener('click', function() {

        const marker = this;

        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){
            marker.setAnimation(null);
            }, 2100);

        basicInfowindow.setContent(self.content);
        basicInfowindow.open(map, marker);

    fetchData(self);

    })

    self.marker.setMap(map);
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
        listItem.infowindow.open(map, listItem.marker);
    }
}