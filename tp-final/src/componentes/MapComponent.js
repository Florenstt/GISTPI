import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import 'ol/ol.css';
import './MapComponent.css';
import ScaleControlComponent from './ScaleControlComponent';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const mapInstance = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: mapRef.current,
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      setMap(mapInstance); // Guardar la instancia del mapa en el estado

      document.getElementById('zoom-out').onclick = function () {
        const view = mapInstance.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom - 1);
      };

      document.getElementById('zoom-in').onclick = function () {
        const view = mapInstance.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom + 1);
      };
    }
  }, [map]);

  return (
    <div>
      <a className="skiplink" href="#map">Go to map</a>
      <div id="map" className="map" tabIndex="0" ref={mapRef}></div>
      <button id="zoom-out">Zoom out</button>
      <button id="zoom-in">Zoom in</button>
      {map && <ScaleControlComponent map={map} />}
    </div>
  );
};

export default MapComponent;