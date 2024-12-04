// AddAgroActivityComponent.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Draw from 'ol/interaction/Draw.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import proj4 from 'proj4';

// Define las proyecciones necesarias
proj4.defs('EPSG:3857', '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs');
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

const AddAgroActivityComponent = ({ show, handleClose, map, onPointDrawn, isDrawingPoint }) => {
  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const drawRef = useRef(null);
  const sourceRef = useRef(new VectorSource());
  const layerRef = useRef(new VectorLayer({
    source: sourceRef.current,
    style: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'black', width: 1 }),
      }),
    }),
  }));

  useEffect(() => {
    if (!map) return;

    map.addLayer(layerRef.current);

    if (isDrawingPoint) {
      drawRef.current = new Draw({
        source: sourceRef.current,
        type: 'Point',
      });

      drawRef.current.on('drawend', (event) => {
        // Coordenadas capturadas en EPSG:3857
        const coords = event.feature.getGeometry().getCoordinates();
        console.log('Coordenadas capturadas en EPSG:3857:', coords);

        // Convertir a EPSG:4326
        const [longitude, latitude] = proj4('EPSG:3857', 'EPSG:4326', coords);
        console.log('Coordenadas convertidas a EPSG:4326:', { latitude, longitude });

        // Actualizar estado o enviar a la API
        setCoordinates([longitude, latitude]);
        onPointDrawn([longitude, latitude]);
      });

      map.addInteraction(drawRef.current);
    }

    return () => {
      if (drawRef.current) {
        map.removeInteraction(drawRef.current);
      }
      map.removeLayer(layerRef.current);
    };
  }, [map, isDrawingPoint, onPointDrawn]);

  const handleSave = () => {
    if (name && coordinates) {
      // Guardar en la base de datos
      axios.post('http://localhost:3001/api/actividades_agropecuarias', {
        name: name,
        coordinates: coordinates,
      })
      .then(response => {
        alert('Registro guardado exitosamente');
        handleClose();
      })
      .catch(error => {
        console.error('Error guardando el registro:', error);
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cargar Actividad Agropecuaria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          {coordinates && (
            <div>
              <p>Coordenadas: {coordinates.join(', ')}</p>
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAgroActivityComponent;