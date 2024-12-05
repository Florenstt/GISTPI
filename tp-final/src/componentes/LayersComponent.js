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
import Icon from 'ol/style/Icon';
import { fromLonLat } from 'ol/proj';
import actividadesAgropecuariasIcon from '../assets/icons/actividadesAgropecuarias.png'; // Importa el archivo PNG por defecto
import actividadesEconomicasIcon from '../assets/icons/actividadesEconomicas.png';
import complejoEnergiaIcon from '../assets/icons/ComplejoDeEnergiaEne.png';
import defaultIcon from '../assets/icons/default.png'; // Importa un ícono por defecto
import './MapComponent.css';

export const createLayers = () => {
  const iconMapping = {
    'actividades_agropecuarias': actividadesAgropecuariasIcon,
    'actividades_economicas': actividadesEconomicasIcon,
    'complejo_de_energia': complejoEnergiaIcon,
    // Añade más mapeos según sea necesario
  };

  const createVectorLayer = (title, typeName, geometryType) => {
    const vectorSource = new VectorSource({
      url: `http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI:${typeName}&outputFormat=application/json`,
      format: new GeoJSON(),
    });

    const iconSrc = iconMapping[typeName] || defaultIcon; // Usa el ícono correspondiente o el ícono por defecto

    const pngStyle = new Style({
      image: new Icon({
        src: iconSrc, // Usa el PNG importado
        scale: 0.3, // Ajusta el tamaño del PNG
      }),
    });

    return new VectorLayer({
      title,
      visible: false, // Las capas están ocultas por defecto
      geometryType, // Añadimos el tipo de geometría
      source: vectorSource,
      style: pngStyle,
      styleUrl: `http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:${typeName}`,
    });
  };

  const createTileLayer = (title, typeName) => {
    return new TileLayer({
      title,
      visible: false, // Las capas están ocultas por defecto
      geometryType: 'Polygon', // Añadimos el tipo de geometría
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/TPI/wms',
        params: {
          LAYERS: `TPI:${typeName}`,
          TILED: true
        },
        serverType: 'geoserver'
      }),
      styleUrl: `http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:${typeName}`,
    });
  };

  const pointLayers = [
    createVectorLayer('Actividades Agropecuarias', 'actividades_agropecuarias', 'Point'),
    createVectorLayer('Actividades Económicas', 'actividades_economicas', 'Point'),
    createVectorLayer('Complejo de Energía', 'complejo_de_energia', 'Point'),
    createVectorLayer('Edif Construcciones Turísticas', 'edif_construcciones_turisticas', 'Point'),
    createVectorLayer('Edif Depor y Esparcimiento', 'edif_depor_y_esparcimiento', 'Point'),
    createVectorLayer('Edif Educación', 'edif_educacion', 'Point'),
    createVectorLayer('Edif Religiosos', 'edif_religiosos', 'Point'),
    createVectorLayer('Edificio de Seguridad', 'edificio_de_seguridad', 'Point'),
    createVectorLayer('Edificio Público', 'edificio_publico', 'Point'),
    createVectorLayer('Edificios Ferroviarios', 'edificios_ferroviarios', 'Point'),
    createVectorLayer('Edificio de Salud', 'edificio_de_salud', 'Point'),
    createVectorLayer('Estructuras Portuarias', 'estructuras_portuarias', 'Point'),
    createVectorLayer('Infraest Aeroportuaria Punto', 'infraest_aeroportuaria_punto', 'Point'),
    createVectorLayer('Infraestructura Hidro', 'infraestructura_hidro', 'Point'),
    createVectorLayer('Localidad', 'localidad', 'Point'),
    createVectorLayer('Marcas y Señales', 'marcas_y_senales', 'Point'),
    createVectorLayer('Obra Portuaria', 'obra_portuaria', 'Point'),
    createVectorLayer('Otras Edificaciones', 'otras_edificaciones', 'Point'),
    createVectorLayer('Puente Red Vial Punto', 'puente_red_vial_punto', 'Point'),
    createVectorLayer('Puntos de Alturas Topográficas', 'puntos_de_alturas_topograficas', 'Point'),
    createVectorLayer('Puntos del Terreno', 'puntos_del_terreno', 'Point'),
    createVectorLayer('Salvado de Obstáculo', 'salvado_de_obstaculo', 'Point'),
    createVectorLayer('Señalizaciones', 'senalizaciones', 'Point'),
  ];

  const lineLayers = [
    createVectorLayer('Curso de Agua', 'curso_de_agua', 'LineString'),
    createVectorLayer('Curvas de Nivel', 'curvas_de_nivel', 'LineString'),
    createVectorLayer('Límite Político Administrativo', 'limite_politico_administrativo', 'LineString'),
    createVectorLayer('Líneas de Conducción de Energía', 'lineas_de_conduccion_ene', 'LineString'),
    createVectorLayer('Red Ferroviaria', 'red_ferroviaria', 'LineString'),
    createVectorLayer('Red Vial', 'red_vial', 'LineString'),
    createVectorLayer('Vías Secundarias', 'vias_secundarias', 'LineString'),
  ];

  const polygonLayers = [
    createTileLayer('Ejido', 'ejido'),
    createTileLayer('Espejos de Agua', 'espejos_de_agua'),
    createTileLayer('Isla', 'isla'),
    createTileLayer('País', 'pais_lim'),
    createTileLayer('Sue Congelado', 'sue_congelado'),
    createTileLayer('Sue Consolidado', 'sue_consolidado'),
    createTileLayer('Sue Costero', 'sue_costero'),
    createTileLayer('Sue Hidromorfologico', 'sue_hidromorfologico'),
    createTileLayer('Sue No Consolidado', 'sue_no_consolidado'),
    createTileLayer('Veg Arborea', 'veg_arborea'),
    createTileLayer('Veg Arbustiva', 'veg_arbustiva'),
    createTileLayer('Veg Cultivos', 'veg_cultivos'),
    createTileLayer('Veg Hidrofila', 'veg_hidrofila'),
    createTileLayer('Veg Suelo Desnudo', 'veg_suelo_desnudo'),
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