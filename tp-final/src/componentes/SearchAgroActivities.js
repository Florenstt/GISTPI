import React, { useEffect, useRef } from 'react';
import Draw from 'ol/interaction/Draw.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { unByKey } from 'ol/Observable.js';

const SearchAgroActivities = ({ map, onSearchComplete }) => {
  const drawRef = useRef(null);
  const sourceRef = useRef(new VectorSource());
  const layerRef = useRef(new VectorLayer({
    source: sourceRef.current,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33',
        }),
      }),
    }),
  }));

  useEffect(() => {
    if (!map) return;

    map.addLayer(layerRef.current);

    drawRef.current = new Draw({
      source: sourceRef.current,
      type: 'Circle',
    });

    drawRef.current.on('drawend', (event) => {
      const circle = event.feature.getGeometry();
      const extent = circle.getExtent();
      const activities = [];

      map.getLayers().forEach(layer => {
        if (layer.get('title') === 'Actividades Agropecuarias') {
          const source = layer.getSource();
          source.forEachFeatureIntersectingExtent(extent, (feature) => {
            const nombre = feature.get('nombre'); // Utiliza el atributo 'nombre'
            if (nombre) {
              activities.push(nombre);
            }
          });
        }
      });

      alert(`Actividades Agropecuarias seleccionadas: ${activities.join(', ')}`);
      onSearchComplete();
    });

    map.addInteraction(drawRef.current);

    return () => {
      if (drawRef.current) {
        map.removeInteraction(drawRef.current);
      }
      map.removeLayer(layerRef.current);
    };
  }, [map, onSearchComplete]);

  return null;
};

export default SearchAgroActivities;