// Code based on Leaflet API examples Source: http://leafletjs.com/examples/choropleth/

var map = L.map('map').setView([33.4725, -112.0722], 10);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'OSM'})
	.addTo(map);
	function getColor(d) {
	    return d > 4 ? '#800026' :
	           d > 3  ? '#BD0026' :
	           d > 2  ? '#E31A1C' :
	           d > 1  ? '#FC4E2A' :
	           d > 0   ? '#FD8D3C' :
	                      '#FFEDA0';
							}

			function style1(feature) {
	        return {
	        fillColor: getColor(feature.properties.restaurantsrestaurents),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
			function style2(feature) {
	        return {
	        fillColor: getColor(feature.properties.NightlifeNightlife),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
			function style3(feature) {
	        return {
	        fillColor: getColor(feature.properties.Nail_SalonNailsalon),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
			function style4(feature) {
	        return {
	        fillColor: getColor(feature.properties.MassageMassage),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
			function style5(feature) {
	        return {
	        fillColor: getColor(feature.properties.JewelryJewelry),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
			function style6(feature) {
	        return {
	        fillColor: getColor(feature.properties.IndianIndian),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
			function style7(feature) {
	        return {
	        fillColor: getColor(feature.properties.EducationEducation),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
			function style8(feature) {
	        return {
	        fillColor: getColor(feature.properties.GroceryGrocery),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
			function style9(feature) {
	        return {
	        fillColor: getColor(feature.properties.GymsGyms),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    			};
									}
	 		var Restaurents=		L.geoJson(Data, {style: style1}).addTo(map);
			var Nightlife=			L.geoJson(Data, {style: style2}).addTo(map);
			var NailSalon=			L.geoJson(Data, {style: style3}).addTo(map);
			var Massage=			L.geoJson(Data, {style: style4}).addTo(map);
			var Jewelry=			L.geoJson(Data, {style: style5}).addTo(map);
			var Indian=				L.geoJson(Data, {style: style6}).addTo(map);
			var Education=			L.geoJson(Data, {style: style7}).addTo(map);
			var Grocery=			L.geoJson(Data, {style: style8}).addTo(map);
			var Gyms=				L.geoJson(Data, {style: style9}).addTo(map);


Restaurents.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Restaurants Rating:  " +layer.feature.properties.restaurantsrestaurents);});
map.fitBounds(Restaurents.getBounds());

Nightlife.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Night Life CLubs Rating:  " +layer.feature.properties.NightlifeNightlife);});
map.fitBounds(Nightlife.getBounds());

NailSalon.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Nail Salons  Rating:  " +layer.feature.properties.Nail_SalonNailsalon);});
map.fitBounds(NailSalon.getBounds());

Massage.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Massage Salons Rating:  " +layer.feature.properties.MassageMassage);});
map.fitBounds(Massage.getBounds());

Jewelry.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Jewelry Shops Rating:  " +layer.feature.properties.JewelryJewelry);});
map.fitBounds(Jewelry.getBounds());

Indian.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Indian Shops Rating:  " +layer.feature.properties.IndianIndian);});
map.fitBounds(Indian.getBounds());

Education.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Education Rating:  " +layer.feature.properties.EducationEducation);});
map.fitBounds(Education.getBounds());

Grocery.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Grocery Shops Rating:  " +layer.feature.properties.GroceryGrocery);});
map.fitBounds(Grocery.getBounds());

Gyms.eachLayer(function (layer) {layer.bindPopup(layer.feature.properties.label +'<br>'+" Gyms Rating:  " +layer.feature.properties.GymsGyms);});
map.fitBounds(Gyms.getBounds());

	var baseMaps = {"Restaurants": Restaurents,"Night Life CLubs": Nightlife,"Nail Salons": NailSalon,"Massage Salons": Massage,"Jewelry Shops": Jewelry,"Indian Shops": Indian,"Education": Education,"Grocery Shops": Grocery,"Gyms": Gyms};
	L.control.layers(baseMaps).addTo(map);



	var legend = L.control({position: 'bottomright'});
		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = ['<strong> Ratings </strong>'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
		        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
console.log("Test");
legend.addTo(map);
