function loadMobileClinicsMap(){
  var mapTypeIds = [];
  for(var type in google.maps.MapTypeId) {
      mapTypeIds.push(google.maps.MapTypeId[type]);
  }
  mapTypeIds.push("OSM");
  var map = new google.maps.Map(document.getElementById("map"), {
     center: mapCenter,
     zoom: 10,
     mapTypeId: google.maps.MapTypeId.HYBRID,
     mapTypeControl: false,
	   disableDefaultUI: true,
     zoomControl: true,
     zoomControlOptions: {
       position: google.maps.ControlPosition.TOP_LEFT
     },
     streetViewControl: true,
     streetViewControlOptions: {
       position: google.maps.ControlPosition.RIGHT_BOTTOM
     }
   });

   map.mapTypes.set("OSM", new google.maps.ImageMapType({
   getTileUrl: function(coord, zoom) {
      var tilesPerGlobe = 1 << zoom;
       var x = coord.x % tilesPerGlobe;
       if (x < 0) {
           x = tilesPerGlobe+x;
       }
     return "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
   },
   tileSize: new google.maps.Size(256, 256),
   name: "OpenStreetMap",
   maxZoom: 18
}));
  var geoLocate = document.createElement('div');
  var geoLocated = new geoLocator(geoLocate, map);
  geoLocate.style['padding-top'] = '4px';
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(geoLocate);

  var iconContainer = document.createElement('div');
   var setBaseMaps = new addlayersIcon(iconContainer, map);
   iconContainer.style['padding-top'] = '4px';
   map.controls[google.maps.ControlPosition.RIGHT_TOP].push(iconContainer);

   var searchInput = document.createElement('input');
		searchInput.id = 'search-box';
		searchInput.title = "Search services and products supported by the Application.";
		searchInput.placeholder = "search item....";
		var searchBox = new google.maps.places.SearchBox(searchInput);
		var searchControl = new searchBoxAdd(searchBox, map);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);

    var geocode = document.createElement('input');
    geocode.id="geocode";
    geocode.type="submit";
    geocode.value="Geocode";
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(geocode);
    geocode.addEventListener("click", function(){
      var searchItem = $.trim($('#search-box').val());
      if(searchItem.length == 0){
        bootbox.alert("<b>Geocoding Item not specified</b></br>You can Specify search Item by filling the folloing in preceeding input field:"+
        "<ol><li> Specify search location eg <small> thika, kenya </small> order</li>"+
        "<li> Define location in lat, lng format eg <small> -1.050570, 36.809488</small>");
      }else{
    geocodeItem(searchItem, map);
      }
    });

    var centerMarker = new google.maps.Marker({
      position: mapCenter,
      title: "Area Of Study Viewport",
      map: map,
      draggable: true,
      clickable: true,
      crossOnDrag: false,
      cursor: "pointer",
      icon: "imgs/markers/surveying-2.png"
    });

  var myCoord = {lat: -1.083523, lng: 36.883646};
  google.maps.event.addListener(centerMarker, 'click', function(evt){
  var lat = evt.latLng.lat().toFixed(6);
  var lng = evt.latLng.lng().toFixed(6);
  var centerInfoWindow = new google.maps.InfoWindow({
    content: "<i><h3>Current Marker Position </h3></i><b>{lat: "+lat+", lng: "+lng+"}</b>",
    disableAutoPan: true
  });
  centerInfoWindow.open(map, centerMarker);
  });

  google.maps.event.addListener(centerMarker, 'dragend', function(evt){
  var lat = evt.latLng.lat().toFixed(6);
  var lng = evt.latLng.lng().toFixed(6);
  var centerInfoWindow = new google.maps.InfoWindow({
    content: "<i><h3>Current Marker Position </h3></i>&nbsp;&nbsp;<b>{lat: "+lat+", lng: "+lng+"}</b>",
    disableAutoPan: true
  });
  centerInfoWindow.open(map, centerMarker);
  });


};

google.maps.event.addDomListener(window, 'load', loadMobileClinicsMap);
