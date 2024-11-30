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
import LayersControl from './LayersControl';
import Sidebar from './Sidebar';
import MeasureComponent from './MeasureComponent';
import ScaleBarControl from './ScaleBarControl';

const MapComponent = () => {
  const mapRef = useRef(null);
  const osmLayerRef = useRef(null);
  const actividadesEconomicasLayerRef = useRef(null);
  const actividadesAgropecuariasLayerRef = useRef(null);

  const [layers, setLayers] = useState({
    osm: true,
    actividadesEconomicas: false,
    actividadesAgropecuarias: false,
  });

  useEffect(() => {
    if (mapRef.current.map) return; // Si el mapa ya existe, no hacer nada

    const actividadesEconomicasLayer = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/TPI/wms',
        params: {
          LAYERS: 'TPI:actividades_economicas',
          TILED: true,
        },
      }),
    });

    const actividadesAgropecuariasLayer = new ImageLayer({
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/TPI/wms',
        params: {
          LAYERS: 'TPI:actividades_agropecuarias',
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
      layers: [osmLayer, actividadesEconomicasLayer, actividadesAgropecuariasLayer],
      view: new View({
        projection: 'EPSG:4326',
        center: [-59, -40.5],
        zoom: 4
      }),
    });

    mapRef.current.map = map;
    osmLayerRef.current = osmLayer;
    actividadesEconomicasLayerRef.current = actividadesEconomicasLayer;
    actividadesAgropecuariasLayerRef.current = actividadesAgropecuariasLayer;
  }, [layers]);

  const handleLayerChange = (layerName, refs) => {
    setLayers((prevLayers) => {
      const newLayers = { ...prevLayers, [layerName]: !prevLayers[layerName] };

      if (refs.osmLayerRef && layerName === 'osm') {
        refs.osmLayerRef.current.setVisible(newLayers.osm);
      } else if (refs.actividadesEconomicasLayerRef && layerName === 'actividadesEconomicas') {
        refs.actividadesEconomicasLayerRef.current.setVisible(newLayers.actividadesEconomicas);
      } else if (refs.actividadesAgropecuariasLayerRef && layerName === 'actividadesAgropecuarias') {
        refs.actividadesAgropecuariasLayerRef.current.setVisible(newLayers.actividadesAgropecuarias);
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
      <MeasureComponent map={mapRef.current?.map} />
      <div ref={mapRef} className="map"></div>
      <Sidebar 
        layers={layers} 
        handleLayerChange={handleLayerChange} 
        osmLayerRef={osmLayerRef}
        actividadesEconomicasLayerRef={actividadesEconomicasLayerRef}
        actividadesAgropecuariasLayerRef={actividadesAgropecuariasLayerRef}
        handleZoom={handleZoom}
      />
      <ScaleBarControl map={mapRef.current?.map} />
    </div>
  );
};

export default MapComponent;