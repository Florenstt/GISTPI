import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import ImageLayer from 'ol/layer/Image.js';
import OSM from 'ol/source/OSM.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MapComponent.css';
import Sidebar from './Sidebar';

const MapComponent = () => {
  const mapRef = useRef(null);
  const osmLayerRef = useRef(null);
  const actividadesEconomicasLayerRef = useRef(null);
  const [layers, setLayers] = useState({
    osm: true,
    actividadesEconomicas: true,
  });

  useEffect(() => {
    if (mapRef.current && !mapRef.current.map) {
      const actividadesEconomicasLayer = new ImageLayer({
        title: "Actividades Económicas",
        visible: layers.actividadesEconomicas,
        source: new ImageWMS({
          url: 'http://localhost:8080/geoserver/TPI/wms',
          params: {
            LAYERS: 'TPI:actividades_economicas',
            TILED: true,
          },
        }),
      });

      const osmLayer = new TileLayer({
        source: new OSM(),
        visible: layers.osm,
      });

      const map = new Map({
        target: mapRef.current,
        layers: [osmLayer, actividadesEconomicasLayer],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      mapRef.current.map = map;
      osmLayerRef.current = osmLayer;
      actividadesEconomicasLayerRef.current = actividadesEconomicasLayer;
    }
  }, [layers]);

  const handleLayerChange = (layer) => {
    setLayers((prevLayers) => {
      const newLayers = {
        ...prevLayers,
        [layer]: !prevLayers[layer],
      };

      if (layer === 'osm') {
        osmLayerRef.current.setVisible(newLayers.osm);
      } else if (layer === 'actividadesEconomicas') {
        actividadesEconomicasLayerRef.current.setVisible(newLayers.actividadesEconomicas);
      }

      return newLayers;
    });
  };

  const handleZoom = (zoomIn) => {
    const view = mapRef.current.map.getView();
    const zoom = view.getZoom();
    view.setZoom(zoomIn ? zoom + 1 : zoom - 1);
  };

  return (
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      <Sidebar layers={layers} handleLayerChange={handleLayerChange} handleZoom={handleZoom} />
    </div>
  );
};

export default MapComponent;