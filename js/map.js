var Actividades_Economicas = new ol.layer.Image({
    title: "Actividades Económicas",
    visible: true,
    source: new ol.source.ImageWMS({
        url: 'http://localhost:8080/geoserver/TPI/wms',
        params: {
            LAYERS: 'TPI:actividades_economicas',
            TILED: true
        },
        serverType: 'geoserver'
    })
});

// Definición del mapa y su capa
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            title: "Base Map",
            source: new ol.source.TileWMS({
                url: 'https://wms.ign.gob.ar/geoserver/ows',
                params: {
                    LAYERS: 'capabaseargenmap'
                }
            })
        }),
        Actividades_Economicas
    ],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [-59, -40.5],
        zoom: 4
    })
});

// Mostrar el nombre de la capa en la barra lateral
document.getElementById('layer-name').innerText = Actividades_Economicas.get('title');