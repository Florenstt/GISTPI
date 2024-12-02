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
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
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
    visible: false,
    source: new VectorSource({
      url: 'http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI%3Aactividades_agropecuarias&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: function (feature) {
      // Define estilos basados en atributos
      const actividad = feature.get('actividad'); // Cambia por el nombre del atributo
      let fillColor;
      switch (actividad) {
        case 'Ganadería':
          fillColor = 'rgba(255, 100, 100, 0.6)';
          break;
        case 'Agricultura':
          fillColor = 'rgba(100, 255, 100, 0.6)';
          break;
        default:
          fillColor = 'rgba(200, 200, 200, 0.6)';
      }
      return new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: fillColor,
          }),
          stroke: new Stroke({
            color: '#333333',
            width: 1,
          }),
        }),
      });
    },
  });

  return [actividadesEconomicasLayer, actividadesAgropecuariasLayer];
};

const LayersComponent = ({ setLayers }) => {
  const mapRef = useRef();

  useEffect(() => {
    const layers = createLayers();
    setLayers(layers.map(layer => ({
      title: layer.get('title'),
      color: layer.getStyle() ? layer.getStyle()().getImage().getFill().getColor() : '#000'
    })));

    const map = new Map({
      target: mapRef.current,
      layers: layers,
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }, [setLayers]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default LayersComponent;