function geoLocator(div, map){
	  div.style.clear = 'both';
		var locator = document.createElement('div');
		locator.id = 'geolocate-container';
		locator.title = 'Go To Your Current Location';
		div.appendChild(locator);
		var locatorTxt = document.createElement('div');
		locatorTxt.id = 'locatorTxt';
		locatorTxt.innerHTML = 'Geolocate';
		locator.appendChild(locatorTxt);
		locator.addEventListener('click', function(){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){
					var currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
					map.setCenter(currentLocation);
					map.setZoom(15);
					var marker = new google.maps.Marker({
						position: currentLocation,
						title: "Your Current Location",
						clickable: true,
						draggable: false,
						map: map
					});
					google.maps.event.addListener(marker, 'click', function(){
						var infoWindow = new google.maps.InfoWindow({
						content: "Your Current GPS Location: </br>{lat: "+
							currentLocation.lat.toFixed(4)+", lng: "+currentLocation.lng.toFixed(4)+"}</br><small>Note: Location details are prone to position error of up to 300m</small>",
							  disableAutoPan: true
						});
						infoWindow.open(map, marker);
					});

				}, function() {
	            bootbox.alert("<h4>Error: The Geolocation service failed.</h4></br>TroubleShoot: Allow/ Share location with App, Ensure You are connected to Internet");
	        });

			} else {
        	bootbox.alert("<h4>Browser doesn't support Geolocation</h4>");
        }
      });
		}


			function addlayersIcon(container, map){
				var appendLayers = false;
				var iconDiv = document.createElement('div');
				iconDiv.id = 'iconDiv';
				iconDiv.title = 'Change BaseMap';
				container.appendChild(iconDiv);
				var icon = document.createElement('img');
				icon.alt = 'BaseMaps';
				icon.src = 'imgs/layers.png';
				iconDiv.appendChild(icon);
				var baseMapsHtml =
				'<div id="baseMapControl">'+
				'<input type="checkbox" id="satellite" /><label >Satellite</label><br />'+
				'<input type="checkbox" id="hybrid" /><label >Hybrid</label><br />'+
				'<input type="checkbox" id="terrain" /><label >Terrain</label><br />'+
				'<input type="checkbox" id="osm" /><label >OSM</label><br />'+
				'<input type="checkbox" id="mobile-clinics" /><label >Mobile Clinics</label><br />'+
				'<input type="checkbox" id="roads" /><label >Roads</label><br />'+
				'<input type="checkbox" id="primary-sch" /><label >Pry Sch</label><br />'+
				'<input type="checkbox" id="sec-sch" /><label >Sec Sch</label><br />'+
				'<input type="checkbox" id="boundaries" /><label >Boundaries</label><br />'+
				'<input type="checkbox" id="forests" /><label >Forests</label><br />'+
				'<input type="checkbox" id="towns" /><label >Towns</label><br />'+
				'</div>';
				var layerDiv = document.createElement('div');
				layerDiv.id = 'basemaps';
				layerDiv.innerHTML = baseMapsHtml;
				icon.addEventListener('click', function(){
					if(appendLayers == false){
						iconDiv.appendChild(layerDiv);
						$('#satellite, #hybrid, #terrain, #osm, #bluestyle,#roadmap, #nightMode').on('click', function(){
						$(this).toggleClass('checked');

								if($('#satellite').hasClass('checked')){
									map.setOptions({
										mapTypeId : google.maps.MapTypeId.SATELLITE
										});
								}
								else if($('#hybrid').hasClass('checked')){
									map.setOptions({
										mapTypeId: google.maps.MapTypeId.HYBRID
									});
								}
								else if($('#terrain').hasClass('checked')){
									map.setOptions({
										mapTypeId: google.maps.MapTypeId.TERRAIN
									});
								}
								else if($('#roadmap').hasClass('checked')){
									map.setOptions({
										mapTypeId: google.maps.MapTypeId.ROADMAP
									});
								}
								else if($('#osm').hasClass('checked')){
									map.setMapTypeId('OSM');
								}

						});


						$('#boundaries').click(function(){
						$(this).toggleClass('checked');
						if($(this).hasClass('checked')){
							$.getJSON('data/constituencies.geojson', function(geojson){
						     map.data.addGeoJson(geojson);
						     var featureStyle = {
						    strokeColor: '#830EB7',
						    strokeWeight: 2,
								fillColor: "#0EB7B7",
								fillOpacity: 0.3
						  };
						map.data.setStyle(featureStyle);
						  });
						}
						});

						$('#forests').click(function(){
						$(this).toggleClass('checked');
						if($(this).hasClass('checked')){
							$.getJSON('data/forests.geojson', function(geojson){
								map.data.addGeoJson(geojson);
								var featureStyle = {
							 strokeColor: '#FCF903',
							 strokeWeight: 3,
							 fillColor: "#0BD81C",
							 fillOpacity: 0.2
						 };
					 map.data.setStyle(featureStyle);
							});
						}
						});

						$('#roads').click(function(){
							$(this).toggleClass('checked');
							if($(this).hasClass('checked')){
								$.getJSON('data/roads.geojson', function(layer){
									map.data.addGeoJson(layer);
								var featureStyle = {
								 strokeColor: '#2D70F9',
								 strokeWeight: 3
							 };
						 map.data.setStyle(featureStyle);
								});
							}
						});

						$('#towns').click(function(){
							$(this).toggleClass('checked');
							if($(this).hasClass('checked')){
								$.getJSON('data/towns.geojson', function(layer){
								$.each(layer.features, function(key, val){
									loadPointData("towns", val.geometry, val.properties, map);
								});
								});
							}
						});

						$('#primary-sch').click(function(){
							$(this).toggleClass('checked');
							if($(this).hasClass('checked')){
								$.getJSON('data/primary_schools.geojson', function(layer){
								$.each(layer.features, function(key, val){
									loadPointData("pry-school", val.geometry, val.properties, map);
								});
								});
							}
						});

						$('#sec-sch').click(function(){
							$(this).toggleClass('checked');
							if($(this).hasClass('checked')){
								$.getJSON('data/secondary_schools.geojson', function(layer){
								$.each(layer.features, function(key, val){
									loadPointData("sec-school", val.geometry, val.properties, map);
								});
								});
							}
						});

						$('#mobile-clinics').click(function(){
							$(this).toggleClass('checked');
							if($(this).hasClass('checked')){
								$.ajax({
									url: "data/manager.php",
									dataType: "json",
									method: "POST",
									data: {data: "clinics"}
								}).success(function(data){
									loadMobileClinics($.parseJSON(data), map);
								}).error(function(xhr, status, error){
									bootbox.alert("Request Failed with status &rarr; "+status+"</br>Error &rarr; "+ error);
								});
							}
						});

						if(!appendLayers){
							var timer = setTimeout(
							function(){
							iconDiv.removeChild(layerDiv);
							appendLayers = true;
							}
							, 10000);
						}
						appendLayers = true;

					}else if(appendLayers  == true){
						appendLayers = false;
						iconDiv.removeChild(layerDiv);
					}



				});

			}


			function loadMobileClinics(data, map){
				$.each(data, function(key, town){
					$.each(town.data, function(key, clinic){
						 addClinicMarker(clinic, town.township, map);
					});
				});
			}

			function addClinicMarker(clinic, township, map){
								//var clinicMarkers = [];
								var location =  new google.maps.LatLng(parseFloat(clinic.latlng.lat), parseFloat(clinic.latlng.lng));
								var  clinicMarker = new google.maps.Marker({
									position: location,
									map: map,
									title: 'Mobile Clinic Operating Hospital',
									icon: "imgs/markers/rescue.png"
								});
								//clinicMarkers.push(clinicMarker);
								//var clinicMarkerCluster = new MarkerClusterer(map, clinicMarkers);
								var infoPop= new google.maps.InfoWindow({
									content: '<div id="mobile-clinic-info"><span id="name">Operator Hospital &rarr; '+clinic.name+'</span>'
									+'<span id="address">Location Coordinates &rarr; {lat: '+parseFloat(clinic.latlng.lat).toFixed(5)+", "+parseFloat(clinic.latlng.lng).toFixed(5)+
									'}</span><span>Hospital Township &rarr; '+township+'</span><span>Hospital Vicinity &rarr; '+clinic.vicinity+'</span></div>',
									disableAutoPan: true
								});
								google.maps.event.addDomListener( clinicMarker, 'click', function(){
									infoPop.open(map,  clinicMarker);
								});
			}

		function loadPointData(type, geometry, properties, map){
			var location =  {lat: parseFloat(geometry.coordinates[0][1]), lng: parseFloat(geometry.coordinates[0][0])}, status = false, content = "", icon, icon_label;
			if(type == "pry-school"){
				icon = "imgs/markers/school.png";
				content = "<div id='point-data-info'><span>School Name: &rarr; "+properties.NAME+
				"</span><span>School Category: &rarr; "+properties.STATUS+"</span></div>";
				status = true;
			}else if(type == "sec-school"){
				icon =  "imgs/markers/star-3.png";
				content ="<div id='point-data-info'><span>School Name: &rarr; "+properties.NAME+
				"</span><span>School Category: &rarr; "+properties.STATUS+"</span></div>";
				status = true;
			}else if(type == "towns"){
				icon =  "imgs/markers/villa.png";
				content = "<div id='point-data-info'><span>Town Name: &rarr; "+properties.Labels+"</span></div>";
				status = true;
			}else{
				status = false;
			}
			if(status){
				var pointMarker = new google.maps.Marker({
					position: location,
					map: map,
					draggable: false,
					clickable: true,
					crossOnDrag: false,
					cursor: "pointer",
					icon: icon
				});
				var infoPop= new google.maps.InfoWindow({
					content: content,
					disableAutoPan: true
				});
				google.maps.event.addDomListener( pointMarker, 'click', function(){
					infoPop.open(map,  pointMarker);
				});
			}
		}


			function drawLayer(geometry, properties){
				console.log(geometry, properties);
					if(geometry.type == 'MultiPoint'){
						var coord = new google.maps.LatLng(geometry.coordinates[1], geometry.coordinates[0]);
						var marker = new google.maps.Marker({
							position: coord,
							map: map,
							title: 'Geometry marker'
						});
						var infoPop= new google.maps.InfoWindow({
							content: '<span id="feature-info">Name : '+properties.NAME+'<br />Status/Type : '+properties.STATUS+'</span>'
						});
						google.maps.event.addDomListener(marker, 'click', function(){
							infoPop.open(map, marker);
						});
					}
					else if(geometry.type == 'LineString'){
						//console.log(properties);
						var linePath = [];
						for(var count = 0; count <geometry.coordinates.length; count++){
							var tmpPoints = new google.maps.LatLng(geometry.coordinates[count][1], geometry.coordinates[count][0]);
							linePath.push(tmpPoints);
						}
						var lineOptions = {
							path: linePath,
							strokeWeight: 3,
							strokeColor: 'red',
							map: map,
							title: "Kenya LineStrings"
						};
						var polyLine = new google.maps.Polyline(lineOptions);
						polyLine.setMap(map);
					}
					else if(geometry.type == 'MultiPolygon'){
						//console.log(properties);
						var areaCover = [];
						for (var count = 0; count < geometry.coordinates[0][0].length; count++){
							var tmpPoints = new google.maps.LatLng(geometry.coordinates[0][0][count][1], geometry.coordinates[0][0][count][0]);
							areaCover.push(tmpPoints);
						}
						var polygonOptions = {
							path: areaCover,
							strokeColor: "red",
							strokeOpacity: 0.7,
							strokeWeight: 2,
							fillColor: "violet",
							fillOpacity: 0.45,
							map: map
						};
						var polygon = new google.maps.Polygon(polygonOptions);
						polygon.setMap(map);
					}
				}

				function searchBoxAdd(searchBox, map){
				map.addListener('bounds_changed', function() {
					searchBox.setBounds(map.getBounds());
				});
				var markers = [];
				searchBox.addListener('places_changed', function() {
					var places = searchBox.getPlaces();
					if (places.length == 0) {
						return;
					}
					markers.forEach(function(marker) {
						marker.setMap(null);
					});
					markers = [];
					var bounds = new google.maps.LatLngBounds();
					places.forEach(function(place) {
						if (!place.geometry) {
							console.log("Returned place contains no geometry");
							return;
						}
						var icon = {
							url: place.icon,
							size: new google.maps.Size(71, 71),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(17, 34),
							scaledSize: new google.maps.Size(25, 25)
						};
						markers.push(new google.maps.Marker({
							map: map,
							icon: icon,
							title: place.name,
							position: place.geometry.location
						}));
						if (place.geometry.viewport) {
							bounds.union(place.geometry.viewport);
						} else {
							bounds.extend(place.geometry.location);
						}
					});
					map.fitBounds(bounds);
				});
	}

	function geocodeItem(item, map){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': item}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
						bootbox.alert("Geocoded Location is &rarr; "+results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
          } else {
            bootbox.alert('Geocode was not successful for the following reason: ' + status);
          }
        });
	}
