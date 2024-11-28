import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import 'ol/ol.css';
import './MapComponent.css';
import ScaleControlComponent from './ScaleControlComponent';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      return; // Si el mapa ya ha sido inicializado, no hacer nada
    }

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    mapRef.current = map; // Guardar la instancia del mapa en el ref

    document.getElementById('zoom-out').onclick = function () {
      const view = map.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom - 1);
    };

    document.getElementById('zoom-in').onclick = function () {
      const view = map.getView();
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
      {mapRef.current && <ScaleControlComponent map={mapRef.current} />}
    </div>
  );
};

export default MapComponent;