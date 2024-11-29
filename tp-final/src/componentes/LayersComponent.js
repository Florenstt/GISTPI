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

    const actividadesAgropecuariasLayer = new ImageLayer({
      title: "Actividades Agropecuarias",
      visible: true,
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/TPI/wms',
        params: {
          LAYERS: 'TPI:actividades_agropecuarias',
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
        actividadesEconomicasLayer,
        actividadesAgropecuariasLayer
      ],
      target: 'map',
      view: new View({
        projection: 'EPSG:4326',
        center: [-59, -40.5],
        zoom: 4
      }),
    });
  }, []);

  return (
    <div>
      <a className="skiplink" href="#map">Go to map</a>
      <div id="map" className="map" tabIndex="0"></div>
    </div>
  );
};

export default LayersComponent;