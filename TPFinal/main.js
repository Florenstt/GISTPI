import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';
import {ScaleLine, defaults as defaultControls} from 'ol/control.js';

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

const baseMapLayer = new TileLayer({
  title: "Base Map",
  source: new TileWMS({
    url: 'https://wms.ign.gob.ar/geoserver/ows',
    params: {
      LAYERS: 'capabaseargenmap'
    }
  })
});

const actividadesEconomicasLayer = new ImageLayer({
  title: "Actividades Económicas",
  visible: true,
  source: new ImageWMS({
    url: 'http://localhost:8080/geoserver/TPI/wms',
    params: {
      LAYERS: 'TPI:actividades_economicas',
      TILED: true
    },
    serverType: 'geoserver'
  })
});

const map = new Map({
  controls: defaultControls().extend([scaleControl()]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    baseMapLayer,
    actividadesEconomicasLayer
  ],
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [-59, -40.5],
    zoom: 4
  }),
});

function reconfigureScaleLine() {
  map.removeControl(control);
  map.addControl(scaleControl());
}

function onChangeUnit() {
  control.setUnits(unitsSelect.value);
}

function onInvertColorsChange() {
  control.element.classList.toggle(
    'ol-scale-bar-inverted',
    invertColorsCheckbox.checked,
  );
}

unitsSelect.addEventListener('change', onChangeUnit);
typeSelect.addEventListener('change', reconfigureScaleLine);
stepsRange.addEventListener('input', reconfigureScaleLine);
scaleTextCheckbox.addEventListener('change', reconfigureScaleLine);
invertColorsCheckbox.addEventListener('change', onInvertColorsChange);

document.getElementById('zoom-out').onclick = function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom + 1);
};

// Manejar los checkboxes para habilitar/deshabilitar capas
var checkboxBaseMap = document.getElementById('toggleBaseMap');
checkboxBaseMap.addEventListener('change', function () {
    var checked = this.checked;
    if (checked !== baseMapLayer.getVisible()) {
        baseMapLayer.setVisible(checked);
    }
});

baseMapLayer.on('change:visible', function () {
    var visible = this.getVisible();
    if (visible !== checkboxBaseMap.checked) {
        checkboxBaseMap.checked = visible;
    }
});

var checkboxActividadesEconomicas = document.getElementById('toggleActividadesEconomicas');
checkboxActividadesEconomicas.addEventListener('change', function () {
    var checked = this.checked;
    if (checked !== actividadesEconomicasLayer.getVisible()) {
        actividadesEconomicasLayer.setVisible(checked);
    }
});

actividadesEconomicasLayer.on('change:visible', function () {
    var visible = this.getVisible();
    if (visible !== checkboxActividadesEconomicas.checked) {
        checkboxActividadesEconomicas.checked = visible;
    }
});
