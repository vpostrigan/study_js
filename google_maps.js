<script>
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: -27.4808533, lng: 153.0105026},
        mapTypeId: 'terrain'
    });

    var rectangle = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        bounds: {
            north: -27.4599999,
            south: -27.4808533,
            east: 153.0355977,
            west: 153.0105026
        }
    });
}
</script>
