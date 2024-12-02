import React, { useEffect, useRef, useState } from 'react';
import Draw from 'ol/interaction/Draw.js';
import Overlay from 'ol/Overlay.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { LineString, Polygon } from 'ol/geom.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { getArea, getLength } from 'ol/sphere.js';
import { unByKey } from 'ol/Observable.js';

const DrawComponent = ({ map, isDrawing }) => {
  const typeSelectRef = useRef(null);
  const helpTooltipElementRef = useRef(null);
  const measureTooltipElementRef = useRef(null);
  const drawRef = useRef(null);
  const sketchRef = useRef(null);
  const helpTooltipRef = useRef(null);
  const measureTooltipRef = useRef(null);
  const [source] = useState(new VectorSource());

  useEffect(() => {
    if (!map) return;

    const vector = new VectorLayer({
      source: source,
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
      name: 'drawLayer',
    });

    map.addLayer(vector);

    const pointerMoveHandler = (evt) => {
      if (evt.dragging) return;
      let helpMsg = 'Click to start drawing';
      if (sketchRef.current) {
        const geom = sketchRef.current.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = 'Click to continue drawing the polygon';
        } else if (geom instanceof LineString) {
          helpMsg = 'Click to continue drawing the line';
        }
      }
      if (helpTooltipElementRef.current) {
        helpTooltipElementRef.current.innerHTML = helpMsg;
        helpTooltipRef.current.setPosition(evt.coordinate);
        helpTooltipElementRef.current.classList.remove('hidden');
      }
    };

    map.on('pointermove', pointerMoveHandler);
    map.getViewport().addEventListener('mouseout', () => {
      if (helpTooltipElementRef.current) {
        helpTooltipElementRef.current.classList.add('hidden');
      }
    });

    const formatLength = (line) => {
      const length = getLength(line);
      return length > 100 ? `${(length / 1000).toFixed(2)} km` : `${length.toFixed(2)} m`;
    };

    const formatArea = (polygon) => {
      const area = getArea(polygon);
      return area > 10000 ? `${(area / 1000000).toFixed(2)} km²` : `${area.toFixed(2)} m²`;
    };

    const createHelpTooltip = () => {
      if (helpTooltipElementRef.current) {
        helpTooltipElementRef.current.remove();
      }
      helpTooltipElementRef.current = document.createElement('div');
      helpTooltipElementRef.current.className = 'ol-tooltip hidden';
      helpTooltipRef.current = new Overlay({
        element: helpTooltipElementRef.current,
        offset: [15, 0],
        positioning: 'center-left',
      });
      map.addOverlay(helpTooltipRef.current);
    };

    const createMeasureTooltip = () => {
      if (measureTooltipElementRef.current) {
        measureTooltipElementRef.current.remove();
      }
      measureTooltipElementRef.current = document.createElement('div');
      measureTooltipElementRef.current.className = 'ol-tooltip ol-tooltip-measure';
      measureTooltipRef.current = new Overlay({
        element: measureTooltipElementRef.current,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
      });
      map.addOverlay(measureTooltipRef.current);
    };

    const addInteraction = () => {
      const type = typeSelectRef.current.value === 'area' ? 'Polygon' : 'LineString';
      drawRef.current = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: 'rgba(0, 0, 0, 0.7)',
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)',
            }),
          }),
        }),
      });
      map.addInteraction(drawRef.current);

      createMeasureTooltip();
      createHelpTooltip();

      let listener;
      drawRef.current.on('drawstart', (evt) => {
        sketchRef.current = evt.feature;
        let tooltipCoord = evt.coordinate;

        listener = sketchRef.current.getGeometry().on('change', (evt) => {
          const geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          if (measureTooltipElementRef.current) {
            measureTooltipElementRef.current.innerHTML = output;
            measureTooltipRef.current.setPosition(tooltipCoord);
          }
        });
      });

      drawRef.current.on('drawend', () => {
        if (measureTooltipElementRef.current) {
          measureTooltipElementRef.current.className = 'ol-tooltip ol-tooltip-static';
          measureTooltipRef.current.setOffset([0, -7]);
        }
        sketchRef.current = null;
        measureTooltipElementRef.current = null;
        createMeasureTooltip();
        unByKey(listener);
      });
    };

    typeSelectRef.current.onchange = () => {
      map.removeInteraction(drawRef.current);
      addInteraction();
    };

    if (isDrawing) {
      addInteraction();
    } else {
      map.removeInteraction(drawRef.current);
      map.removeOverlay(helpTooltipRef.current);
      map.removeOverlay(measureTooltipRef.current);
      if (helpTooltipElementRef.current) {
        helpTooltipElementRef.current.remove();
      }
      if (measureTooltipElementRef.current) {
        measureTooltipElementRef.current.remove();
      }
    }

    return () => {
      map.removeInteraction(drawRef.current);
      map.removeOverlay(helpTooltipRef.current);
      map.removeOverlay(measureTooltipRef.current);
      if (helpTooltipElementRef.current) {
        helpTooltipElementRef.current.remove();
      }
      if (measureTooltipElementRef.current) {
        measureTooltipElementRef.current.remove();
      }
    };
  }, [map, isDrawing, source]);

  return (
    <div>
      <select ref={typeSelectRef} id="type">
        <option value="length">Length</option>
        <option value="area">Area</option>
      </select>
    </div>
  );
};

export default DrawComponent;