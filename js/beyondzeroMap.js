$(document).ready(function(){

    map = new GMaps({
       el: '#map',
       lat: -1.1466128754952878,
       lng: 36.74172020080732,
       zoom: 12,
       zoomControl : true,
  	 zoomControlOpt:{
  		position: 'TOP_LEFT'
  	 },
       panControl : true,
       streetViewControl : true,
       mapTypeControlOptions: {
  	  position: google.maps.ControlPosition.TOP_RIGHT,
  	  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds : ["hybrid", "roadmap", "satellite", "terrain"]
      },
      overviewMapControl: false
     });

    map.addMapType("osm", {
        getTileUrl: function(coord, zoom) {
          return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
      });
      map.setMapTypeId("hybrid");
      var search;
      map.addControl({
          content: '<input type="text" id="address" class="geocode form-control " name="address" placeholder="geocode Address/Name..."/><input type="submit" class="btn btn-info btn-sm" value="Geocode" id="geocode" />',
          position: 'top_left',
          events: {
          click: function(){
              $( "input#address" ).keyup(function() {
                search = $( this ).val();
              }).keyup();
              $('input.btn#geocode').click(function(){
                GMaps.geocode({
                  address: search.trim(),
                  callback: function(results, status){
                    if(status=='OK'){
                      var latlng = results[0].geometry.location;
                      map.setCenter(latlng.lat(), latlng.lng());
                      map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                      });
                    }
                  }
                });
                return false;
              });
          }

        }
      });



      map.addControl({
        content: '<input id="place-input" class="auto-search" type="text" placeholder="Search Auto.... " />',
        position: 'top_left',
        events: {
          click: function(){
            $( "input#place-input" ).keyup(function() {
              console.log($( this ).val());
            }).keyup();
          }
        }
      });
      map.addControl({
        position: 'top_right',
        content: 'Geolocate',
        style: {
          margin: '5px 6px 7px 0',
          padding: '1px 6px',
          fontSize: '16pt',
          fontFamily: 'monospace, lucida console',
          backgroundColor: '#e7e7e7',
          color: '#0e440b'
        },
        events: {
          click: function(){
            GMaps.geolocate({
              success: function(position){
                map.setCenter(position.coords.latitude, position.coords.longitude);
                map.addMarker({
                  lat: position.coords.latitude,
                  lng:  position.coords.longitude,
                  title: 'Current Location',
                  details: {
                    author: 'Our system determined that you are currently here'
                  }
                  });
              },
              error: function(error){
                alert('Geolocation failed: ' + error.message);
              },
              not_supported: function(){
                alert("Your browser does not support geolocation");
              }
            });
          }
        }
      });

  function bulkSearch(item){
        map.addLayer('places', {
          location : new google.maps.LatLng(-0.4237307, 36.9549251),
          radius : 500,
          types : [item],
          search: function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                var place = results[i];
                map.addMarker({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  title : place.name,
                  infoWindow : {
                    content : '<h2>'+place.name+'</h2><p>'+(place.vicinity ? place.vicinity : place.formatted_address)+'</p><img src="'+place.icon+'"" width="100"/>'
                  }
                });
              }
            }
          }
        });
      }
  map.addControl({
    content: "<button id='add-vector' class='btn btn-dander btn-md'>Vector Overlay</button>",
    position: "top_left",
    events: {
      click: addVectorLayers,
    style: {
      margin: '5px 6px 7px 0',
      padding: '1px 6px',
      fontSize: '16pt',
      fontFamily: 'monospace, lucida console',
      backgroundColor: '#e7e7e7',
      color: '#0e440b'
    }
    }
  });

  map.setContextMenu({
       control: 'map',
       options: [{
         title: 'Add marker',
         name: 'add_marker',
         action: function(e){
           console.log("["+e.latLng.lat()+", "+e.latLng.lng()+"],");
           this.addMarker({
             lat: e.latLng.lat(),
             lng: e.latLng.lng(),
             title: 'New marker'
           });
           this.hideContextMenu();
         }
       }, {
         title: 'Center here',
         name: 'center_here',
         action: function(e){
           this.setCenter(e.latLng.lat(), e.latLng.lng());
         }
       }]
     });
     function addVectorLayers(){
           $.getJSON('data/constituencies.geojson', function(data){
             var paths, layer, details;
             $.each(data, function(key, value){
                 paths = value[2];
               });
               layer = paths.geometry;
               details = paths.properties;
               map.drawPolygon({
               paths: layer.coordinates,
               useGeoJSON: true,
               strokeColor: '#131540',
               strokeOpacity: 0.6,
               strokeWeight: 6
             });
             });

             $.getJSON('data/roads.geojson', function(data){
               var paths,lines;
               $.each(data, function(key, value){
                   paths = value[2];
                 });
                 lines = paths.geometry.coordinates;
                 var count = 0;
                 while(count < lines.length){
                   var line_path = [];
                   for(var i = 0; i< lines[count].length; i+=2){
                     line_path.push(lines[count][i], lines[count][i+1])
                   }
                   console.log(line_path, line_path.length);
                   map.drawPolyline({
                   path: line_path,
                   strokeColor: '#131540',
                   strokeOpacity: 0.6,
                   strokeWeight: 6
                 });
                   count += 1;
                 }
                 /*
              $.each(lines, function(pos, line){
                console.log(line);
                  map.drawPolyline({
                  path: line[pos],
                  strokeColor: '#131540',
                  strokeOpacity: 0.6,
                  strokeWeight: 6
                });*/
               });
               $.getJSON('data/towns.geojson', function(data){
                $.each(data.features, function(key, town){
                  map.addMarker({
                    lat: town.geometry.coordinates[0][1],
                    lng: town.geometry.coordinates[0][0],
                    title: 'Shopping/Trading Center'
                  });
                });
                 });
     }


});
