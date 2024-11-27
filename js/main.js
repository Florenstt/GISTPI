import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { ScaleLine, defaults as defaultControls } from 'ol/control';

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

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  controls: defaultControls().extend([scaleControl()]),
});

unitsSelect.addEventListener('change', function () {
  map.removeControl(control);
  map.addControl(scaleControl());
});

typeSelect.addEventListener('change', function () {
  map.removeControl(control);
  map.addControl(scaleControl());
});

stepsRange.addEventListener('input', function () {
  control.setSteps(parseInt(this.value, 10));
});

scaleTextCheckbox.addEventListener('change', function () {
  control.setScaleText(this.checked);
});

invertColorsCheckbox.addEventListener('change', onInvertColorsChange);

function onInvertColorsChange() {
  const className = 'ol-scale-bar-inverted';
  const element = control.element;
  if (invertColorsCheckbox.checked) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}
