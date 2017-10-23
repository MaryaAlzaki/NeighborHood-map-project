 
 'use strict'
       // Create map and a new blank array for all the listing markers.

      var map;
      var markers = [];
        var marker;

      //Function to initialize the map within the map div
  var locations = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ];//end of lcations array
      function initMap() {
        
        var mapCanvus=document.getElementById('map');
         var mapOptions={
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13
        }//end of mapOptions
        map = new google.maps.Map(mapCanvus,mapOptions);
        //map constructor

      
        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          console.log(position);
          var title = locations[i].title;
          
          // Create a marker per location, and put into markers array.
           marker = new google.maps.Marker(
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
          marker.addListener('click', function() { populateInfoWindow(this, largeInfowindow); },function(){

          });
           //markers.addListener('click',function(){ toggleBounce(this)});
          bounds.extend(markers[i].position);
          }//End for loop
          console.log("markers");
          console.log(markers);
           console.log("locations");
           console.log(locations);
           console.log("marker");
           console.log(marker);
  

        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
      }
       function toggleBounce() {
        if (markers.getAnimation() !== null) {
          markers.setAnimation(null);
        } else {
          markers.setAnimation(google.maps.Animation.BOUNCE);
        }
      }//End of initmap
   
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
        // Foursquare API Client
        /*var CLIENTID="5V4BL3MFZP4LNOC4FGP21GU044G3P5RIT4IDTNBRMNV0ICPV";
        var CLIENTSECRET="DXRDJE1H1Q0QME5IO5AHJIHVWZV1DPB1WLX3IO23XQ5ILM4L";
        //Foursquare URL
        var APIURL='https://api.foursquare.com/v2/venues/search?ll=' +
                markers.lat + ',' + markers.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&query=' + markers.title +
                '&v=20170708' + '&m=foursquare';
        console.log(APIURL);
*/

      }
     
        var viewModel=function(){
          var self=this;
          var searchterm=ko.observable("");
         
          

          self.locatioList=ko.observableArray(locations);

          self.locatioList().forEach(
            function(locations){locations.visible=ko.observable(true); });
          
          
          //self.myObservableString=ko.observable('');
       self.locatioList=ko.computed(function(){
            var result=[];
            var locationToCheck;
            for(var i=0;i<locations.length; i++){
              locationToCheck=locations[i].title;
              console.log(locations.length);
              console.log(locationToCheck);
              if(locationToCheck.toLowerCase().includes(this.searchterm().toLowerCase())){
                result.push(locationToCheck);
                this.marker[i].setVisible(true);
              }
              else{
                this.marker[i].setVisible(false);
                result.push(locationToCheck);
                console.log(result.title);
              }

            }
             this.searchterm=ko.observable(result);
              return result;
          },this);
         

          self.doSomthing=ko.computed(function(){ self.myObservableString(); });

        };

        var vm=new viewModel();
        ko.applyBindings(vm);


     
