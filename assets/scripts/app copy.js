mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGlhbWJlbmRhdmlzIiwiYSI6IlVrb3BGVzQifQ.jeHxDCnpXXvAXKfAFEYG-A';
var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [53.6880, 32.4279], // starting position [lng, lat]
      zoom: 5 // starting zoom
});
let geojson;


fetch("http://185.162.41.170:5050/Main/SiteBaseApi/GetAllMap")
      .then(res => res.json())
      .then(data => {
            geojson = makeGeojson(data);
            addMarker(geojson);
      })


function makeGeojson(data) {
      let features = data.map(point => {
            return {
                  'type': 'Feature',
                  'properties': point,
                  'geometry': {
                        'type': 'Point',
                        'coordinates': [point.Longitude, point.Latitude]
                  }
            }
      })
      return {
            'type': 'FeatureCollection',
            'features': features
      }
}

function addMarker(geojson) {

      // add marker
      geojson.features.forEach(function (marker) {
            // create a DOM element for the marker
            var el = document.createElement('div');
            let span = document.createElement("div");
            span.style.background = "url(./assets/images/dca-logo.jpg";
            el.appendChild(span);
            span.style.width = "80px";
            span.style.height = "22px";
            span.style.backgroundSize = "contain";
            span.style.backgroundPosition = "center";
            span.style.backgroundRepeat = "no-repeat";
            span.style.borderRadius = "18px"

            el.className = 'marker';
            el.style.background = 'white';
            // el.style.width = marker.properties.iconSize[0] + 'px';
            // el.style.height = marker.properties.iconSize[1] + 'px';
            el.style.height = '30px';
            el.style.width = '88px';
            el.style.display = "flex"
            el.style.justifyContent = "center";
            el.style.alignItems = "center";

            el.style.borderRadius = "18px"


            el.style.backgroundSize = '100%';

            let popupTmp = `
            <div class="popup-temp">
                  <div class="image">
                  <img src="./assets/images/${marker.properties.coverImage}" class="cover">
                  <h3></h3>
                  </div>
                  <div class="info">
                   <div class="mobile">
                              <i class="fa fa-map-marker-alt"></i>
                              <span>${marker.properties.RegionTitle}</span>
                        </div>
                        <div class="person">
                              <i class="fas fa-user"></i>
                              <span>${marker.properties.FirstName} ${marker.properties.LastName}</span>
                        </div>
                        <div class="phone">
                              <i class="fa fa-phone"></i>
                              <span>${marker.properties.PartyCode}</span>
                        </div>
                        <div class="postal">
                              <i class="fa fa-envelope"></i>
                              <span>${marker.properties.PostalCode}</span>
                        </div>
                        <div class="address">
                              <i class="fa fa-map-marker"></i>
                              <span>${marker.properties.AddressValue}</span>
                        </div>
                  </div>
            </div>
      `
            new mapboxgl.Marker(el)
                  .setLngLat(marker.geometry.coordinates)
                  .setPopup(new mapboxgl.Popup({ offset: 10 }) // add popups
                        .setHTML(popupTmp))
                  .addTo(map);


            el.addEventListener('click', function () {

            });

            // add marker to map
            new mapboxgl.Marker(el)
                  .setLngLat(marker.geometry.coordinates)
                  .addTo(map);
      });
}