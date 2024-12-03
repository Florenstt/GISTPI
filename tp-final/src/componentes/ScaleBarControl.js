// ScaleBarControl.js
import React, { useEffect, useRef, useState } from 'react';
import { ScaleLine } from 'ol/control.js';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import './ScaleBarControl.css';

const ScaleBarControl = ({ map }) => {
  const controlRef = useRef(null);
  const unitsSelectRef = useRef(null);
  const typeSelectRef = useRef(null);
  const stepsRangeRef = useRef(null);
  const scaleTextCheckboxRef = useRef(null);
  const invertColorsCheckboxRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    if (!map) return;

    let control;

    function scaleControl() {
      if (!unitsSelectRef.current || !typeSelectRef.current || !stepsRangeRef.current || !scaleTextCheckboxRef.current || !invertColorsCheckboxRef.current) {
        return;
      }

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
      if (controlRef.current) {
        map.removeControl(controlRef.current);
      }
      controlRef.current = scaleControl();
      if (controlRef.current) {
        map.addControl(controlRef.current);
      }
    }

    function onChangeUnit() {
      if (controlRef.current) {
        controlRef.current.setUnits(unitsSelectRef.current.value);
      }
    }

    function onInvertColorsChange() {
      if (controlRef.current) {
        controlRef.current.element.classList.toggle(
          'ol-scale-bar-inverted',
          invertColorsCheckboxRef.current.checked,
        );
      }
    }

    controlRef.current = scaleControl();
    if (controlRef.current) {
      map.addControl(controlRef.current);
    }

    if (unitsSelectRef.current) {
      unitsSelectRef.current.addEventListener('change', onChangeUnit);
    }
    if (typeSelectRef.current) {
      typeSelectRef.current.addEventListener('change', reconfigureScaleLine);
    }
    if (stepsRangeRef.current) {
      stepsRangeRef.current.addEventListener('input', reconfigureScaleLine);
    }
    if (scaleTextCheckboxRef.current) {
      scaleTextCheckboxRef.current.addEventListener('change', reconfigureScaleLine);
    }
    if (invertColorsCheckboxRef.current) {
      invertColorsCheckboxRef.current.addEventListener('change', onInvertColorsChange);
    }

    return () => {
      if (controlRef.current) {
        map.removeControl(controlRef.current);
      }
      if (unitsSelectRef.current) {
        unitsSelectRef.current.removeEventListener('change', onChangeUnit);
      }
      if (typeSelectRef.current) {
        typeSelectRef.current.removeEventListener('change', reconfigureScaleLine);
      }
      if (stepsRangeRef.current) {
        stepsRangeRef.current.removeEventListener('input', reconfigureScaleLine);
      }
      if (scaleTextCheckboxRef.current) {
        scaleTextCheckboxRef.current.removeEventListener('change', reconfigureScaleLine);
      }
      if (invertColorsCheckboxRef.current) {
        invertColorsCheckboxRef.current.removeEventListener('change', onInvertColorsChange);
      }
    };
  }, [map, dropdownOpen]);

  return (
    <div className="scale-bar-container">
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret>
          Controles de Escala
        </DropdownToggle>
        <DropdownMenu>
          <div className="scale-bar-options">
            <label>
              Units:
              <select id="units" ref={unitsSelectRef} defaultValue="metric">
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
                <option value="nautical">Nautical</option>
              </select>
            </label>
            <label>
              Type:
              <select id="type" ref={typeSelectRef} defaultValue="scalebar">
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
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ScaleBarControl;