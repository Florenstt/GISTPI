// SearchLayerByName.js
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Draw from 'ol/interaction/Draw.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import TileWMS from 'ol/source/TileWMS';

const SearchLayerByName = ({ show, handleClose, map, layers }) => {
  const [selectedLayer, setSelectedLayer] = useState(null);
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

  const handleLayerSelect = (event) => {
    const layerTitle = event.target.value;
    const layer = layers.find(layer => layer.get('title') === layerTitle);
    setSelectedLayer(layer);
  };

  const handleSearch = () => {
    if (!map || !selectedLayer) return;

    handleClose(); // Cerrar el modal al hacer clic en "Buscar"

    // Verificar si la capa ya está presente en el mapa
    const existingLayer = map.getLayers().getArray().find(layer => layer === layerRef.current);
    if (!existingLayer) {
      map.addLayer(layerRef.current);
    }

    drawRef.current = new Draw({
      source: sourceRef.current,
      type: 'Circle',
    });

    drawRef.current.on('drawend', async (event) => {
      const circle = event.feature.getGeometry();
      const extent = circle.getExtent();
      const names = [];

      if (selectedLayer instanceof VectorLayer) {
        selectedLayer.getSource().forEachFeatureIntersectingExtent(extent, (feature) => {
          const name = feature.get('nombre'); // Utiliza el atributo 'nombre'
          if (name) {
            names.push(name);
          }
        });
      } else if (selectedLayer.getSource() instanceof TileWMS) {
        const url = selectedLayer.getSource().getFeatureInfoUrl(
          circle.getCenter(),
          map.getView().getResolution(),
          map.getView().getProjection(),
          { 'INFO_FORMAT': 'application/json' }
        );

        if (url) {
          const response = await fetch(url);
          const data = await response.json();
          data.features.forEach((feature) => {
            const name = feature.properties.nombre; // Utiliza el atributo 'nombre'
            if (name) {
              names.push(name);
            }
          });
        }
      }

      alert(`Nombres seleccionados: ${names.join(', ')}`);
      map.removeInteraction(drawRef.current); // Eliminar la interacción de dibujo después de la búsqueda
      sourceRef.current.clear(); // Limpiar la fuente del vector para eliminar el círculo
      map.removeLayer(layerRef.current); // Eliminar la capa del mapa
    });

    map.addInteraction(drawRef.current);
  };

  useEffect(() => {
    return () => {
      if (drawRef.current && map) {
        map.removeInteraction(drawRef.current);
      }
      if (map) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [map]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Buscar Nombre de Actividad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formLayerSelect">
            <Form.Label>Seleccionar Capa</Form.Label>
            <Form.Control as="select" onChange={handleLayerSelect}>
              <option value="">Seleccione una capa</option>
              {layers.map((layer, index) => (
                <option key={index} value={layer.get('title')}>
                  {layer.get('title')}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSearch} disabled={!selectedLayer}>
          Buscar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchLayerByName;