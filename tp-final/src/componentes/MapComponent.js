import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import ImageLayer from 'ol/layer/Image.js';
import OSM from 'ol/source/OSM.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import 'ol/ol.css';
import './MapComponent.css';
import DrawComponent from './DrawComponent';

const MapComponent = () => {
  const mapRef = useRef(null);
  const osmLayerRef = useRef(null);
  const actividadesEconomicasLayerRef = useRef(null);
  const [layers, setLayers] = useState({
    osm: true,
    actividadesEconomicas: true,
  });

  useEffect(() => {
    if (mapRef.current) return; // Si el mapa ya existe, no hacer nada

    const actividadesEconomicasLayer = new ImageLayer({
      title: "Actividades Económicas",
      visible: layers.actividadesEconomicas,
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/TPI/wms',
        params: {
          LAYERS: 'TPI:actividades_economicas',
          TILED: true
        },
        serverType: 'geoserver'
      })
    });

    const osmLayer = new TileLayer({
      source: new OSM(),
      visible: layers.osm,
    });

    osmLayerRef.current = osmLayer;
    actividadesEconomicasLayerRef.current = actividadesEconomicasLayer;

    mapRef.current = new Map({
      layers: [
        osmLayer,
        actividadesEconomicasLayer
      ],
      target: 'map',
      view: new View({
        projection: 'EPSG:4326',
        center: [-59, -40.5],
        zoom: 4
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

  useEffect(() => {
    if (osmLayerRef.current) {
      osmLayerRef.current.setVisible(layers.osm);
    }
    if (actividadesEconomicasLayerRef.current) {
      actividadesEconomicasLayerRef.current.setVisible(layers.actividadesEconomicas);
    }
  }, [layers]);

  const handleLayerChange = (layerName) => {
    setLayers((prevLayers) => ({
      ...prevLayers,
      [layerName]: !prevLayers[layerName],
    }));
  };

  return (
    <div>
      <a className="skiplink" href="#map">Go to map</a>
      <div id="map" className="map" tabIndex="0" style={{ width: 'calc(100% - 200px)', height: '100vh' }}></div>
      <div className="sidebar">
        <h3>Controls</h3>
        <button id="zoom-out">Zoom out</button>
        <button id="zoom-in">Zoom in</button>
        <h3>Layers</h3>
        <label>
          <input
            type="checkbox"
            checked={layers.osm}
            onChange={() => handleLayerChange('osm')}
          />
          OSM
        </label>
        <label>
          <input
            type="checkbox"
            checked={layers.actividadesEconomicas}
            onChange={() => handleLayerChange('actividadesEconomicas')}
          />
          Actividades Económicas
        </label>
        <DrawComponent map={mapRef.current} />
      </div>
      
    </div>
  );
};

export default MapComponent;