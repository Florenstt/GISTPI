import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import ImageLayer from 'ol/layer/Image.js';
import VectorLayer from 'ol/layer/Vector.js';
import OSM from 'ol/source/OSM.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Select from 'ol/interaction/Select.js';
import { click } from 'ol/events/condition.js';
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
      url: 'http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI:actividades_agropecuarias&outputFormat=application/json',
      format: new GeoJSON()
    })
  });

  return [actividadesEconomicasLayer, actividadesAgropecuariasLayer];
};

const LayersComponent = () => {
  const mapRef = useRef(null);

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

    const selectClick = new Select({
      condition: click,
      layers: [layers[1]] // Selecciona solo la capa actividadesAgropecuariasLayer
    });

    selectClick.on('select', (event) => {
      const selectedFeatures = event.selected;
      if (selectedFeatures.length > 0) {
        const feature = selectedFeatures[0];
        const featureId = feature.getId();
        console.log('Feature clicked:', feature);
        console.log('Feature ID:', featureId);

        // Realiza una solicitud al servidor para obtener más información sobre el elemento
        const url = `http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI:actividades_agropecuarias&featureID=${featureId}&outputFormat=application/json`;
        console.log('Fetching URL:', url);

        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            console.log('Feature data:', data);
            // Aquí puedes agregar la lógica para manejar los datos del elemento
          })
          .catch(error => {
            console.error('Error fetching feature data:', error);
          });
      }
    });

    map.addInteraction(selectClick);

    return () => map.setTarget(null);
  }, []);

  return <div ref={mapRef} className="map" />;
};

export default LayersComponent;