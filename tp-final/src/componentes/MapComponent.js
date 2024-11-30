// MapComponent.js
import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import 'ol/ol.css';
import './MapComponent.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInitializedRef = useRef(false);

  useEffect(() => {
    if (!mapInitializedRef.current) {
      const tileLayer = new TileLayer({
        source: new OSM(),
        title: 'OSM Layer',
      });

      new Map({
        layers: [tileLayer],
        target: mapRef.current,
        view: new View({
          center: [-6500000, -4000000], // Coordenadas de Argentina
          zoom: 4, // Ajusta el nivel de zoom según sea necesario
        }),
      });

      mapInitializedRef.current = true;
    }
  }, []);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default MapComponent;