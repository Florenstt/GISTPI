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
  const redCircleStyle = new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({ color: 'black', width: 1 }), // Borde del círculo
    }),
  });

  const createVectorLayer = (title, typeName, color, geometryType) => {
    return new VectorLayer({
      title,
      visible: false, // Las capas están ocultas por defecto
      geometryType, // Añadimos el tipo de geometría
      source: new VectorSource({
        url: `http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI:${typeName}&outputFormat=application/json`,
        format: new GeoJSON(),
      }),
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color }),
          stroke: new Stroke({ color: 'black', width: 1 }),
        }),
      }),
      styleUrl: `http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:${typeName}`,
    });
  };

  const createTileLayer = (title, typeName) => {
    return new TileLayer({
      title,
      visible: false, // Las capas están ocultas por defecto
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/TPI/wms',
        params: {
          LAYERS: `TPI:${typeName}`,
          TILED: true
        },
        serverType: 'geoserver'
      })
    });
  };

  const pointLayers = [
    createVectorLayer('Actividades Agropecuarias', 'actividades_agropecuarias', 'red', 'Point'),
    createVectorLayer('Actividades Económicas', 'actividades_economicas', 'blue', 'Point'),
    createVectorLayer('Complejo de Energía', 'complejo_de_energia', 'green', 'Point'),
    createVectorLayer('Edif Construcciones Turísticas', 'edif_construcciones_turisticas', 'yellow', 'Point'),
    createVectorLayer('Edif Depor y Esparcimiento', 'edif_depor_y_esparcimiento', 'purple', 'Point'),
    createVectorLayer('Edif Educación', 'edif_educacion', 'orange', 'Point'),
    createVectorLayer('Edif Religiosos', 'edif_religiosos', 'pink', 'Point'),
    createVectorLayer('Edificio de Seguridad', 'edificio_de_seguridad', 'brown', 'Point'),
    createVectorLayer('Edificio Público', 'edificio_publico', 'cyan', 'Point'),
    createVectorLayer('Edificios Ferroviarios', 'edificios_ferroviarios', 'magenta', 'Point'),
    createVectorLayer('Edificio de Salud', 'edificio_de_salud', 'lime', 'Point'),
    createVectorLayer('Estructuras Portuarias', 'estructuras_portuarias', 'navy', 'Point'),
    createVectorLayer('Infraest Aeroportuaria Punto', 'infraest_aeroportuaria_punto', 'teal', 'Point'),
    createVectorLayer('Infraestructura Hidro', 'infraestructura_hidro', 'olive', 'Point'),
    createVectorLayer('Localidad', 'localidad', 'maroon', 'Point'),
    createVectorLayer('Marcas y Señales', 'marcas_y_senales', 'silver', 'Point'),
    createVectorLayer('Obra Portuaria', 'obra_portuaria', 'gold', 'Point'),
    createVectorLayer('Otras Edificaciones', 'otras_edificaciones', 'coral', 'Point'),
    createVectorLayer('Puente Red Vial Punto', 'puente_red_vial_punto', 'orchid', 'Point'),
    createVectorLayer('Puntos de Alturas Topográficas', 'puntos_de_alturas_topograficas', 'plum', 'Point'),
    createVectorLayer('Puntos del Terreno', 'puntos_del_terreno', 'khaki', 'Point'),
    createVectorLayer('Salvado de Obstáculo', 'salvado_de_obstaculo', 'lavender', 'Point'),
    createVectorLayer('Señalizaciones', 'senalizaciones', 'ivory', 'Point'),
  ];

  const lineLayers = [
    createVectorLayer('Curso de Agua', 'curso_de_agua', 'blue', 'LineString'),
    createVectorLayer('Curvas de Nivel', 'curvas_de_nivel', 'brown', 'LineString'),
    createVectorLayer('Límite Político Administrativo', 'limite_politico_administrativo', 'red', 'LineString'),
    createVectorLayer('Líneas de Conducción de Energía', 'lineas_de_conduccion_ene', 'orange', 'LineString'),
    createVectorLayer('Red Ferroviaria', 'red_ferroviaria', 'black', 'LineString'),
    createVectorLayer('Red Vial', 'red_vial', 'yellow', 'LineString'),
    createVectorLayer('Vías Secundarias', 'vias_secundarias', 'green', 'LineString'),
  ];

  const polygonLayers = [
    createVectorLayer('Ejido', 'ejido', 'blue', 'Polygon'),
    createVectorLayer('Espejos de Agua', 'espejos_de_agua', 'cyan', 'Polygon'),
    createVectorLayer('Isla', 'isla', 'green', 'Polygon'),
    createVectorLayer('País', 'pais_lim', 'red', 'Polygon'),
    createVectorLayer('Sue Congelado', 'sue_congelado', 'gray', 'Polygon'),
    createVectorLayer('Sue Consolidado', 'sue_consolidado', 'brown', 'Polygon'),
    createVectorLayer('Sue Costero', 'sue_costero', 'yellow', 'Polygon'),
    createVectorLayer('Sue Hidromorfologico', 'sue_hidromorfologico', 'olive', 'Polygon'),
    createVectorLayer('Sue No Consolidado', 'sue_no_consolidado', 'orange', 'Polygon'),
    createVectorLayer('Veg Arborea', 'veg_arborea', 'darkgreen', 'Polygon'),
    createVectorLayer('Veg Arbustiva', 'veg_arbustiva', 'lightgreen', 'Polygon'),
    createVectorLayer('Veg Cultivos', 'veg_cultivos', 'green', 'Polygon'),
    createVectorLayer('Veg Hidrofila', 'veg_hidrofila', 'blue', 'Polygon'),
    createVectorLayer('Veg Suelo Desnudo', 'veg_suelo_desnudo', 'tan', 'Polygon'),
  ];

  return [...pointLayers, ...lineLayers, ...polygonLayers];
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