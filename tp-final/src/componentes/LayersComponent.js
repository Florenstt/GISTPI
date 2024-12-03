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

  const actividadesAgropecuariasLayer = new TileLayer({
    title: "Actividades Agropecuarias",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:actividades_agropecuarias',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:actividades_agropecuarias',
        TILED: true,
        STYLE: ''
      },
      serverType: 'geoserver'
    })
  });

  const actividadesEconomicasLayer = new TileLayer({
    title: "Actividades Económicas",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:actividades_economicas',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:actividades_economicas',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const espejoDeAguaLayer = new TileLayer({
    title: "Espejo de Agua",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:espejo_de_agua_hid',
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
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:veg_hidrofila',
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