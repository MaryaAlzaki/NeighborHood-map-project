 
 'use strict'
       // Create map and a new blank array for all the listing markers.

      var map;
      var markers = [];
      //Function to initialize the map within the map div

      function initMap() {
        var mapCanvus=document.getElementById('map');
         var mapOptions={
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13
        }//end of mapOptions
        map = new google.maps.Map(mapCanvus,mapOptions);
        //map constructor

        var locations = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ];//end of lcations array
        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

function hideAndShow(){
  for (var i = 0; i < locations.length; i++) {
    var name="bt"+i;
    var listLocation=document.getElementById("name").addListener(click,toggleBounce);
    console.log(listLocation);

  }
}
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker(
          {
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i

          }
          );//End of marker object
          // Push the marker to our array of markers.
          markers.push(marker);
         
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() { populateInfoWindow(this, largeInfowindow); });
           //markers.addListener('click',function(){ toggleBounce(this)});
          bounds.extend(markers[i].position);
          }//End for loop
  

        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
      }
       function toggleBounce() {
        if (markers.getAnimation() !== null) {
          markers.setAnimation(null);
        } else {
          markers.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
   
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);

          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }

      }
      function viewModel(){

        this.location=[   {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
];
      }
      ko.applyBindings(new viewModel());