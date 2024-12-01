// ScaleBarControl.js
import React, { useEffect, useRef } from 'react';
import { ScaleLine } from 'ol/control.js';
import './ScaleBarControl.css';

const ScaleBarControl = ({ map }) => {
  const controlRef = useRef(null);
  const unitsSelectRef = useRef(null);
  const typeSelectRef = useRef(null);
  const stepsRangeRef = useRef(null);
  const scaleTextCheckboxRef = useRef(null);
  const invertColorsCheckboxRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    let control;

    function scaleControl() {
      if (typeSelectRef.current.value === 'scaleline') {
        control = new ScaleLine({
          units: unitsSelectRef.current.value,
        });
      } else {
        control = new ScaleLine({
          units: unitsSelectRef.current.value,
          bar: true,
          steps: parseInt(stepsRangeRef.current.value, 10),
          text: scaleTextCheckboxRef.current.checked,
          minWidth: 140,
        });
        onInvertColorsChange();
      }
      return control;
    }

    function reconfigureScaleLine() {
      map.removeControl(controlRef.current);
      controlRef.current = scaleControl();
      map.addControl(controlRef.current);
    }

    function onChangeUnit() {
      controlRef.current.setUnits(unitsSelectRef.current.value);
    }

    function onInvertColorsChange() {
      controlRef.current.element.classList.toggle(
        'ol-scale-bar-inverted',
        invertColorsCheckboxRef.current.checked,
      );
    }

    controlRef.current = scaleControl();
    map.addControl(controlRef.current);

    unitsSelectRef.current.addEventListener('change', onChangeUnit);
    typeSelectRef.current.addEventListener('change', reconfigureScaleLine);
    stepsRangeRef.current.addEventListener('input', reconfigureScaleLine);
    scaleTextCheckboxRef.current.addEventListener('change', reconfigureScaleLine);
    invertColorsCheckboxRef.current.addEventListener('change', onInvertColorsChange);

    return () => {
      map.removeControl(controlRef.current);
      unitsSelectRef.current.removeEventListener('change', onChangeUnit);
      typeSelectRef.current.removeEventListener('change', reconfigureScaleLine);
      stepsRangeRef.current.removeEventListener('input', reconfigureScaleLine);
      scaleTextCheckboxRef.current.removeEventListener('change', reconfigureScaleLine);
      invertColorsCheckboxRef.current.removeEventListener('change', onInvertColorsChange);
    };
  }, [map]);

  return (
    <div className="scale-bar-options">
      <label>
        Units:
        <select id="units" ref={unitsSelectRef}>
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
          <option value="nautical">Nautical</option>
        </select>
      </label>
      <label>
        Type:
        <select id="type" ref={typeSelectRef}>
          <option value="scaleline">Scale Line</option>
          <option value="scalebar">Scale Bar</option>
        </select>
      </label>
      <label>
        Steps:
        <input type="range" id="steps" ref={stepsRangeRef} min="1" max="4" defaultValue="2" />
      </label>
      <label>
        Show Scale Text:
        <input type="checkbox" id="showScaleText" ref={scaleTextCheckboxRef} />
      </label>
      <label>
        Invert Colors:
        <input type="checkbox" id="invertColors" ref={invertColorsCheckboxRef} />
      </label>
    </div>
  );
};

export default ScaleBarControl;