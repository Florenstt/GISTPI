// ScaleBarControl.js
import React, { useEffect, useRef } from 'react';
import { ScaleLine } from 'ol/control.js';
import './ScaleBarControl.css';

const ScaleBarControl = ({ map }) => {
  const scaleBarOptionsContainerRef = useRef(null);
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
        scaleBarOptionsContainerRef.current.style.display = 'none';
      } else {
        control = new ScaleLine({
          units: unitsSelectRef.current.value,
          bar: true,
          steps: parseInt(stepsRangeRef.current.value, 10),
          text: scaleTextCheckboxRef.current.checked,
          minWidth: 140,
        });
        onInvertColorsChange();
        scaleBarOptionsContainerRef.current.style.display = 'block';
      }
      return control;
    }

    function reconfigureScaleLine() {
      map.removeControl(control);
      map.addControl(scaleControl());
    }

    function onChangeUnit() {
      control.setUnits(unitsSelectRef.current.value);
    }

    function onInvertColorsChange() {
      control.element.classList.toggle(
        'ol-scale-bar-inverted',
        invertColorsCheckboxRef.current.checked,
      );
    }

    map.addControl(scaleControl());

    unitsSelectRef.current.addEventListener('change', onChangeUnit);
    typeSelectRef.current.addEventListener('change', reconfigureScaleLine);
    stepsRangeRef.current.addEventListener('input', reconfigureScaleLine);
    scaleTextCheckboxRef.current.addEventListener('change', reconfigureScaleLine);
    invertColorsCheckboxRef.current.addEventListener('change', onInvertColorsChange);

    return () => {
      unitsSelectRef.current.removeEventListener('change', onChangeUnit);
      typeSelectRef.current.removeEventListener('change', reconfigureScaleLine);
      stepsRangeRef.current.removeEventListener('input', reconfigureScaleLine);
      scaleTextCheckboxRef.current.removeEventListener('change', reconfigureScaleLine);
      invertColorsCheckboxRef.current.removeEventListener('change', onInvertColorsChange);
      map.removeControl(control);
    };
  }, [map]);

  return (
    <div className="scale-bar-control">
        <h3>Scale Bar Control</h3>
      <label htmlFor="units">Units:</label>
      <select ref={unitsSelectRef} id="units">
        <option value="degrees">degrees</option>
        <option value="imperial">imperial inch</option>
        <option value="us">us inch</option>
        <option value="nautical">nautical mile</option>
        <option value="metric" selected>metric</option>
      </select>

      <label htmlFor="type">Type:</label>
      <select ref={typeSelectRef} id="type">
        <option value="scaleline">ScaleLine</option>
        <option value="scalebar">ScaleBar</option>
      </select>

      <div ref={scaleBarOptionsContainerRef} id="scaleBarOptions">
        <label htmlFor="steps">Steps:</label>
        <input ref={stepsRangeRef} id="steps" type="range" value="4" min="1" max="8" />

        <label><input type="checkbox" ref={scaleTextCheckboxRef} id="showScaleText" checked /> Show scale text</label>

        <label><input type="checkbox" ref={invertColorsCheckboxRef} id="invertColors" /> Invert colors</label>
      </div>
    </div>
  );
};

export default ScaleBarControl;