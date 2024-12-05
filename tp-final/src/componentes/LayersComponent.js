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
import './MapComponent.css';
import actividadesAgropecuariasIcon from '../assets/icons/actividadesAgropecuarias.png'; // Importa el archivo PNG por defecto
import actividadesEconomicasIcon from '../assets/icons/actividadesEconomicas.png';
import complejoEnergiaIcon from '../assets/icons/ComplejoDeEnergiaEne.png';
import defaultIcon from '../assets/icons/default.png'; // Importa un ícono por defecto
import edifDeporYEsparcimientoIcon from '../assets/icons/EdificioDeporYEsparcimiento.png';
import edifEducacionIcon from '../assets/icons/EdificiosEducacion.png';
import edifReligiososIcon from '../assets/icons/EdificioReligiosos.png';
import edificioDeSeguridadIcon from '../assets/icons/EdificioDeSeguridadIPS.png';
import edificioPublicoIcon from '../assets/icons/EdificioPublicosIPS.png';
import edificiosFerroviariosIcon from '../assets/icons/EdificiosFerroviarios.png';
import edificioDeSaludIcon from '../assets/icons/EdificioDeSaludIPS.png';
import estructurasPortuariasIcon from '../assets/icons/EstructurasPortuarias.png';
import infraestAeroportuariaPuntoIcon from '../assets/icons/InfraestruraAeroportuariaPunto.png';
import infraestructuraHidroIcon from '../assets/icons/InfraestruraHidro.png';
import localidadIcon from '../assets/icons/Localidades.png';
import marcasYSenalesIcon from '../assets/icons/MarcasYSeñales.png';
import obraPortuariaIcon from '../assets/icons/ObraPortuaria.png';
import otrasEdificacionesIcon from '../assets/icons/OtrasEdificaciones.png';
import puenteRedVialPuntoIcon from '../assets/icons/PuenteRedVialPuntos.png';
import puntosDeAlturasTopograficasIcon from '../assets/icons/PuntosDeAlturasTopograficas.png';
import puntosDelTerrenoIcon from '../assets/icons/PuntosDelTerreno.png';
import senalizacionesIcon from '../assets/icons/Senalizaciones.png';
import edificiosConstruccionesTuristicas from '../assets/icons/edif_construcciones_turisticas.png';

export const createLayers = () => {
  const iconMapping = {
    'actividades_agropecuarias': actividadesAgropecuariasIcon,
    'actividades_economicas': actividadesEconomicasIcon,
    'complejo_de_energia_ene': complejoEnergiaIcon,
    'edif_construcciones_turisticas': edificiosConstruccionesTuristicas,
    'edif_depor_y_esparcimiento': edifDeporYEsparcimientoIcon,
    'edif_educacion': edifEducacionIcon,
    'edif_religiosos': edifReligiososIcon,
    'edificio_de_seguridad_ips': edificioDeSeguridadIcon,
    'edificio_publico_ips': edificioPublicoIcon,
    'edificios_ferroviarios': edificiosFerroviariosIcon,
    'edificio_de_salud_ips': edificioDeSaludIcon,
    'estructuras_portuarias': estructurasPortuariasIcon,
    'infraestructura_aeroportuaria_punto': infraestAeroportuariaPuntoIcon,
    'infraestructura_hidro': infraestructuraHidroIcon,
    'localidades': localidadIcon,
    'marcas_y_senales': marcasYSenalesIcon,
    'obra_portuaria': obraPortuariaIcon,
    'otras_edificaciones': otrasEdificacionesIcon,
    'puente_red_vial_puntos': puenteRedVialPuntoIcon,
    'puntos_de_alturas_topograficas': puntosDeAlturasTopograficasIcon,
    'puntos_del_terreno': puntosDelTerrenoIcon,
    'senalizaciones': senalizacionesIcon,
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
        scale: 0.8, // Ajusta el tamaño del PNG
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
    createVectorLayer('Complejo de Energía', 'complejo_de_energia_ene', 'Point'),
    createVectorLayer('Edif Construcciones Turísticas', 'edif_construcciones_turisticas', 'Point'),
    createVectorLayer('Edif Depor y Esparcimiento', 'edif_depor_y_esparcimiento', 'Point'),
    createVectorLayer('Edif Educación', 'edif_educacion', 'Point'),
    createVectorLayer('Edif Religiosos', 'edif_religiosos', 'Point'),
    createVectorLayer('Edificio de Seguridad', 'edificio_de_seguridad_ips', 'Point'),
    createVectorLayer('Edificio Público', 'edificio_publico_ips', 'Point'),
    createVectorLayer('Edificios Ferroviarios', 'edificios_ferroviarios', 'Point'),
    createVectorLayer('Edificio de Salud', 'edificio_de_salud_ips', 'Point'),
    createVectorLayer('Estructuras Portuarias', 'estructuras_portuarias', 'Point'),
    createVectorLayer('Infraest Aeroportuaria Punto', 'infraestructura_aeroportuaria_punto', 'Point'),
    createVectorLayer('Infraestructura Hidro', 'infraestructura_hidro', 'Point'),
    createVectorLayer('Localidades', 'localidades', 'Point'),
    createVectorLayer('Marcas y Señales', 'marcas_y_senales', 'Point'),
    createVectorLayer('Obra Portuaria', 'obra_portuaria', 'Point'),
    createVectorLayer('Otras Edificaciones', 'otras_edificaciones', 'Point'),
    createVectorLayer('Puente Red Vial Punto', 'puente_red_vial_puntos', 'Point'),
    createVectorLayer('Puntos de Alturas Topográficas', 'puntos_de_alturas_topograficas', 'Point'),
    createVectorLayer('Puntos del Terreno', 'puntos_del_terreno', 'Point'),
    createVectorLayer('Salvado de Obstáculo', 'salvado_de_obstaculo', 'Point'),
    createVectorLayer('Señalizaciones', 'senalizaciones', 'Point'),
  ];

  const lineLayers = [
    createVectorLayer('Curso de Agua', 'curso_de_agua_hid', 'LineString'),
    createVectorLayer('Curvas de Nivel', 'curvas_de_nivel', 'LineString'),
    createVectorLayer('Límite Político Administrativo', 'limite_politico_administrativo_lim', 'LineString'),
    createVectorLayer('Líneas de Conducción de Energía', 'lineas_de_conduccion_ene', 'LineString'),
    createVectorLayer('Red Ferroviaria', 'red_ferroviaria', 'LineString'),
    createVectorLayer('Red Vial', 'red_vial', 'LineString'),
    createVectorLayer('Vías Secundarias', 'vias_secundarias', 'LineString'),
  ];

  const polygonLayers = [
    createTileLayer('Ejido', 'ejido'),
    createTileLayer('Espejos de Agua', 'espejo_de_agua_hid'),
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