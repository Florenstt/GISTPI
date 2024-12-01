// ScaleBarControl.js
import React, { useEffect, useRef } from 'react';
import { ScaleLine, defaults as defaultControls } from 'ol/control.js';
import './ScaleBarControl.css';

const ScaleBarControl = ({ map }) => {
  const controlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const scaleBarOptionsContainer = document.getElementById('scaleBarOptions');
    const unitsSelect = document.getElementById('units');
    const typeSelect = document.getElementById('type');
    const stepsRange = document.getElementById('steps');
    const scaleTextCheckbox = document.getElementById('showScaleText');
    const invertColorsCheckbox = document.getElementById('invertColors');

    let control;

    function scaleControl() {
      if (typeSelect.value === 'scaleline') {
        control = new ScaleLine({
          units: unitsSelect.value,
        });
        scaleBarOptionsContainer.style.display = 'none';
      } else {
        control = new ScaleLine({
          units: unitsSelect.value,
          bar: true,
          steps: parseInt(stepsRange.value, 10),
          text: scaleTextCheckbox.checked,
          minWidth: 140,
        });
        onInvertColorsChange();
        scaleBarOptionsContainer.style.display = 'block';
      }
      return control;
    }

    function reconfigureScaleLine() {
      map.removeControl(controlRef.current);
      controlRef.current = scaleControl();
      map.addControl(controlRef.current);
    }

    function onChangeUnit() {
      controlRef.current.setUnits(unitsSelect.value);
    }

    function onInvertColorsChange() {
      controlRef.current.element.classList.toggle(
        'ol-scale-bar-inverted',
        invertColorsCheckbox.checked,
      );
    }

    controlRef.current = scaleControl();
    map.addControl(controlRef.current);

    unitsSelect.addEventListener('change', onChangeUnit);
    typeSelect.addEventListener('change', reconfigureScaleLine);
    stepsRange.addEventListener('input', reconfigureScaleLine);
    scaleTextCheckbox.addEventListener('change', reconfigureScaleLine);
    invertColorsCheckbox.addEventListener('change', onInvertColorsChange);

    return () => {
      map.removeControl(controlRef.current);
      unitsSelect.removeEventListener('change', onChangeUnit);
      typeSelect.removeEventListener('change', reconfigureScaleLine);
      stepsRange.removeEventListener('input', reconfigureScaleLine);
      scaleTextCheckbox.removeEventListener('change', reconfigureScaleLine);
      invertColorsCheckbox.removeEventListener('change', onInvertColorsChange);
    };
  }, [map]);

  return (
    <div>
      <div id="scaleBarOptions">
        <label>
          Units:
          <select id="units">
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
            <option value="nautical">Nautical</option>
          </select>
        </label>
        <label>
          Type:
          <select id="type">
            <option value="scaleline">Scale Line</option>
            <option value="scalebar">Scale Bar</option>
          </select>
        </label>
        <label>
          Steps:
          <input type="range" id="steps" min="1" max="4" defaultValue="2" />
        </label>
        <label>
          Show Scale Text:
          <input type="checkbox" id="showScaleText" />
        </label>
        <label>
          Invert Colors:
          <input type="checkbox" id="invertColors" />
        </label>
      </div>
    </div>
  );
};

export default ScaleBarControl;