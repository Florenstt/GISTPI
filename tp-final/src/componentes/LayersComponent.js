import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import ImageLayer from 'ol/layer/Image.js';
import OSM from 'ol/source/OSM.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import 'ol/ol.css';
import './MapComponent.css';

const LayersComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; // Si el mapa ya existe, no hacer nada

    const actividadesEconomicasLayer = new ImageLayer({
      title: "Actividades Económicas",
      visible: true,
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/TPI/wms',
        params: {
          LAYERS: 'TPI:actividades_economicas',
          TILED: true
        },
        serverType: 'geoserver'
      })
    });

    mapRef.current = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        actividadesEconomicasLayer
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    document.getElementById('zoom-out').onclick = function () {
      const view = mapRef.current.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom - 1);
    };

    document.getElementById('zoom-in').onclick = function () {
      const view = mapRef.current.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom + 1);
    };
  }, []);

  return (
    <div>
      <a className="skiplink" href="#map">Go to map</a>
      <div id="map" className="map" tabIndex="0"></div>
      <button id="zoom-out">Zoom out</button>
      <button id="zoom-in">Zoom in</button>
    </div>
  );
};

export default LayersComponent;