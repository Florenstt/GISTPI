import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
import { fromLonLat } from 'ol/proj';
import './MapComponent.css';

export const createLayers = () => {
  const actividadesEconomicasLayer = new VectorLayer({
    title: "Actividades Económicas",
    visible: false, // Asegúrate de que la capa esté visible
    source: new VectorSource({
      url: 'http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI%3Aactividades_economicas&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.5)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1)'
        })
      })
    })
  });

  const actividadesAgropecuariasLayer = new VectorLayer({
    title: "Actividades Agropecuarias",
    visible: false, // Asegúrate de que la capa esté visible
    source: new VectorSource({
      url: 'http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI%3Aactividades_agropecuarias&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.5)'
        }),
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, 1)'
        })
      })
    })
  });

  const espejoDeAguaLayer = new TileLayer({
    title: "Espejo de Agua",
    visible: false, // Asegúrate de que la capa esté visible
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:espejo_de_agua_hid',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const vegHidrofilaLayer = new TileLayer({
    title: "Vegetación Hidrófila",
    visible: false, // Asegúrate de que la capa esté visible
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:veg_hidrofila',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  return [actividadesEconomicasLayer, actividadesAgropecuariasLayer, espejoDeAguaLayer, vegHidrofilaLayer];
};

const LayersComponent = ({ setLayers }) => {
  const mapRef = useRef();

  useEffect(() => {
    const layers = createLayers();
    setLayers(layers);

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: 'https://ows.terrestris.de/osm/service',
            params: { LAYERS: 'OSM-WMS' },
          }),
        }), // Capa base opcional
        ...layers, // Capas adicionales
      ],
      view: new View({
        center: fromLonLat([-64.0, -38.0]), // Coordenadas centradas en el área de la capa
        zoom: 6 // Nivel de zoom inicial
      })
    });

    // Limpieza del mapa al desmontar el componente
    return () => {
      map.setTarget(null);
    };
  }, [setLayers]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default LayersComponent;