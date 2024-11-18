import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        new TileLayer({
            source: new TileWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {'LAYERS': 'your_workspace:your_layer', 'TILED': true},
                serverType: 'geoserver'
            })
        })
    ],
    view: new View({
        center: [0, 0],
        zoom: 2
    })
});