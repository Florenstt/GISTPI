import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import ImageLayer from 'ol/layer/Image.js';
import { Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON.js';
import Select from 'ol/interaction/Select.js';
import { click } from 'ol/events/condition.js';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import 'ol/ol.css';
import './MapComponent.css';

export const createLayers = () => {
  const actividadesEconomicasLayer = new ImageLayer({
    title: "Actividades Económicas",
    visible: false, // Oculto por defecto
    source: new ImageWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:actividades_economicas',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const actividadesAgropecuariasLayer = new VectorLayer({
    title: "Actividades Agropecuarias",
    visible: false, // Oculto por defecto
    source: new VectorSource({
      url: 'http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI%3Aactividades_agropecuarias&outputFormat=application%2Fjson',
      format: new GeoJSON()
    })
  });

  return [actividadesEconomicasLayer, actividadesAgropecuariasLayer];
};

const LayersComponent = () => {
  const mapRef = useRef();

  useEffect(() => {
    const layers = createLayers();

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        ...layers
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    

    return () => map.setTarget(null);
  }, []);

  return (
    <div>
      <div ref={mapRef} className="map" />
      <div id="status" />
    </div>
  );
};

export default LayersComponent;