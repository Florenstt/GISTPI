var baseMapLayer = new ol.layer.Tile({
    title: "Base Map",
    source: new ol.source.TileWMS({
        url: 'https://wms.ign.gob.ar/geoserver/ows',
        params: {
            LAYERS: 'capabaseargenmap'
        }
    })
});

var actividadesEconomicasLayer = new ol.layer.Image({
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

// Definición del mapa y sus capas
var map = new ol.Map({
    target: 'map',
    layers: [
        baseMapLayer,
        actividadesEconomicasLayer
    ],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [-59, -40.5],
        zoom: 4
    })
});

// Manejar los checkboxes para habilitar/deshabilitar capas
var checkboxBaseMap = document.getElementById('toggleBaseMap');
checkboxBaseMap.addEventListener('change', function () {
    var checked = this.checked;
    if (checked !== baseMapLayer.getVisible()) {
        baseMapLayer.setVisible(checked);
    }
});

baseMapLayer.on('change:visible', function () {
    var visible = this.getVisible();
    if (visible !== checkboxBaseMap.checked) {
        checkboxBaseMap.checked = visible;
    }
});

var checkboxActividadesEconomicas = document.getElementById('toggleActividadesEconomicas');
checkboxActividadesEconomicas.addEventListener('change', function () {
    var checked = this.checked;
    if (checked !== actividadesEconomicasLayer.getVisible()) {
        actividadesEconomicasLayer.setVisible(checked);
    }
});

actividadesEconomicasLayer.on('change:visible', function () {
    var visible = this.getVisible();
    if (visible !== checkboxActividadesEconomicas.checked) {
        checkboxActividadesEconomicas.checked = visible;
    }
});

 

// Mostrar el nombre de la capa en la barra lateral
document.getElementById('layer-name').innerText = actividadesEconomicasLayer.get('title');