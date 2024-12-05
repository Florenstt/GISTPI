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

  const actividadesAgropecuariasLayer = new VectorLayer({
    title: 'Actividades Agropecuarias',
    visible: true,
    source: new VectorSource({
      url: 'http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI:actividades_agropecuarias&outputFormat=application/json',
      format: new GeoJSON(),
    }),
    style: redCircleStyle,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:actividades_agropecuarias',
  });

  const actividadesEconomicasLayer = new VectorLayer({
    title: "Actividades Económicas",
    visible: false,
    source: new VectorSource({
      url: 'http://localhost:8080/geoserver/TPI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=TPI%3Aactividades_economicas&outputFormat=application%2Fjson',
      format: new GeoJSON()
    }),
    style: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: 'rgba(255, 100, 100, 0.6)',
        }),
        stroke: new Stroke({
          color: '#333333',
          width: 1,
        }),
      }),
    }),
  });

  const complejoDeEnergiaLayer = new TileLayer({
    title: "Complejo de Energía",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:complejo_de_energia',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:complejo_de_energia',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const cursoDeAguaLayer = new TileLayer({
    title: "Curso de Agua",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:curso_de_agua',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:curso_de_agua',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const curvasDeNivelLayer = new TileLayer({
    title: "Curvas de Nivel",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:curvas_de_nivel',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:curvas_de_nivel',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const edifConstruccionesTuristicasLayer = new TileLayer({
    title: "Edif Construcciones Turísticas",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:edif_construcciones_turisticas',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:edif_construcciones_turisticas',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const edifDeporYEsparcimientoLayer = new TileLayer({
    title: "Edif Depor y Esparcimiento",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:edif_depor_y_esparcimiento',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:edif_depor_y_esparcimiento',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const edifEducacionLayer = new TileLayer({
    title: "Edif Educación",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:edif_educacion',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:edif_educacion',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const edifReligiososLayer = new TileLayer({
    title: "Edif Religiosos",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:edif_religiosos',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:edif_religiosos',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const edificioDeSeguridadLayer = new TileLayer({
    title: "Edificio de Seguridad",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:edificio_de_seguridad',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:edificio_de_seguridad',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const edificioPublicoLayer = new TileLayer({
    title: "Edificio Público",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:edificio_publico',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:edificio_publico',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const edificiosFerroviariosLayer = new TileLayer({
    title: "Edificios Ferroviarios",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:edificios_ferroviarios',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:edificios_ferroviarios',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const edificioDeSaludLayer = new TileLayer({
    title: "Edificio de Salud",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:edificio_de_salud',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:edificio_de_salud',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const ejidoLayer = new TileLayer({
    title: "Ejido",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:ejido',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:ejido',
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

  const estructurasPortuariasLayer = new TileLayer({
    title: "Estructuras Portuarias",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:estructuras_portuarias',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:estructuras_portuarias',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const infraestAeroportuariaPuntoLayer = new TileLayer({
    title: "Infraestructura Aeroportuaria Punto",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:infraest_aeroportuaria_punto',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:infraest_aeroportuaria_punto',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const infraestructuraHidroLayer = new TileLayer({
    title: "Infraestructura Hidro",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:infraestructura_hidro',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:infraestructura_hidro',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const islaLayer = new TileLayer({
    title: "Isla",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:isla',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:isla',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const limitePoliticoAdministrativoLayer = new TileLayer({
    title: "Límite Político Administrativo",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:limite_politico_administrativo',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:limite_politico_administrativo',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const lineasDeConduccionEneLayer = new TileLayer({
    title: "Líneas de Conducción de Energía",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:lineas_de_conduccion_ene',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:lineas_de_conduccion_ene',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const localidadLayer = new TileLayer({
    title: "Localidad",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:localidad',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:localidad',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });
  
  const marcasYSeñalesLayer = new TileLayer({
    title: "Marcas y Señales",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:marcas_y_señales',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:marcas_y_señales',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const muroEmbalseLayer = new TileLayer({
    title: "Muro Embalse",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:muro_embalse',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:muro_embalse',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const obraPortuariaLayer = new TileLayer({
    title: "Obra Portuaria",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:obra_portuaria',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:obra_portuaria',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const obrasDeComunicacionLayer = new TileLayer({
    title: "Obras de Comunicación",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:obras_de_comunicacion',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:obras_de_comunicacion',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const otrasEdificacionesLayer = new TileLayer({
    title: "Otras Edificaciones",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:otras_edificaciones',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:otras_edificaciones',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const paisLayer = new TileLayer({
    title: "País",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:pais',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:pais',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const puenteRedVialPuntoLayer = new TileLayer({
    title: "Puente Red Vial Punto",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:puente_red_vial_punto',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:puente_red_vial_punto',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const puntosDeAlturasTopograficasLayer = new TileLayer({
    title: "Puntos de Alturas Topográficas",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:puntos_de_alturas_topograficas',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:puntos_de_alturas_topograficas',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const puntosDelTerrenoLayer = new TileLayer({
    title: "Puntos del Terreno",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:puntos_del_terreno',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:puntos_del_terreno',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const redFerroviariaLayer = new TileLayer({
    title: "Red Ferroviaria",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:red_ferroviaria',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:red_ferroviaria',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const redVialLayer = new TileLayer({
    title: "Red Vial",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:red_vial',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:red_vial',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const salvadoDeObstaculoLayer = new TileLayer({
    title: "Salvado de Obstáculo",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:salvado_de_obstaculo',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:salvado_de_obstaculo',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const señalizacionesLayer = new TileLayer({
    title: "Señalizaciones",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:señalizaciones',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:señalizaciones',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const sueCongeladoLayer = new TileLayer({
    title: "Sue Congelado",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:sue_congelado',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:sue_congelado',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const sueConsolidadoLayer = new TileLayer({
    title: "Sue Consolidado",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:sue_consolidado',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:sue_consolidado',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const sueCosteroLayer = new TileLayer({
    title: "Sue Costero",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:sue_costero',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:sue_costero',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const sueHidromorfologicoLayer = new TileLayer({
    title: "Sue Hidromorfológico",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:sue_hidromorfologico',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:sue_hidromorfologico',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const sueNoConsolidadoLayer = new TileLayer({
    title: "Sue No Consolidado",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:sue_no_consolidado',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:sue_no_consolidado',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const vegArboreaLayer = new TileLayer({
    title: "Vegetación Arbórea",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:veg_arborea',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:veg_arborea',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const vegArbustivaLayer = new TileLayer({
    title: "Vegetación Arbustiva",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:veg_arbustiva',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:veg_arbustiva',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const vegCultivosLayer = new TileLayer({
    title: "Vegetación Cultivos",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:veg_cultivos',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:veg_cultivos',
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

  const vegSueloDesnudoLayer = new TileLayer({
    title: "Vegetación Suelo Desnudo",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:veg_suelo_desnudo',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:veg_suelo_desnudo',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  const viasSecundariasLayer = new TileLayer({
    title: "Vías Secundarias",
    visible: false,
    styleUrl: 'http://localhost:8080/geoserver/TPI/wms?service=WMS&request=GetLegendGraphic&version=1.1.1&format=image/png&layer=TPI:vias_secundarias',
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/TPI/wms',
      params: {
        LAYERS: 'TPI:vias_secundarias',
        TILED: true
      },
      serverType: 'geoserver'
    })
  });

  return [
    actividadesAgropecuariasLayer,
    actividadesEconomicasLayer,
    complejoDeEnergiaLayer,
    cursoDeAguaLayer,
    curvasDeNivelLayer,
    edifConstruccionesTuristicasLayer,
    edifDeporYEsparcimientoLayer,
    edifEducacionLayer,
    edifReligiososLayer,
    edificioDeSeguridadLayer,
    edificioPublicoLayer,
    edificiosFerroviariosLayer,
    edificioDeSaludLayer,
    ejidoLayer,
    estructurasPortuariasLayer,
    infraestAeroportuariaPuntoLayer,
    infraestructuraHidroLayer,
    islaLayer,
    limitePoliticoAdministrativoLayer,
    lineasDeConduccionEneLayer,
    localidadLayer,
    espejoDeAguaLayer,
    vegHidrofilaLayer,
    marcasYSeñalesLayer,
    muroEmbalseLayer,
    obraPortuariaLayer,
    obrasDeComunicacionLayer,
    otrasEdificacionesLayer,
    paisLayer,
    puenteRedVialPuntoLayer,
    puntosDeAlturasTopograficasLayer,
    puntosDelTerrenoLayer,
    redFerroviariaLayer,
    redVialLayer,
    salvadoDeObstaculoLayer,
    señalizacionesLayer,
    sueCongeladoLayer,
    sueConsolidadoLayer,
    sueCosteroLayer,
    sueHidromorfologicoLayer,
    sueNoConsolidadoLayer,
    vegArboreaLayer,
    vegArbustivaLayer,
    vegCultivosLayer,
    vegSueloDesnudoLayer,
    viasSecundariasLayer
  ];
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