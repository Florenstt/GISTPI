// AddAgroActivityComponent.js
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Draw } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import 'ol/ol.css';

const AddAgroActivityComponent = ({ show, handleClose, map, isDrawingPoint, onPointDrawn }) => {
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
        const coords = event.feature.getGeometry().getCoordinates();
        setCoordinates(coords);
        onPointDrawn(coords);
      });

      map.addInteraction(drawRef.current);
    } else {
      if (drawRef.current) {
        map.removeInteraction(drawRef.current);
      }
    }

    return () => {
      if (drawRef.current) {
        map.removeInteraction(drawRef.current);
      }
      map.removeLayer(layerRef.current);
    };
  }, [map, isDrawingPoint]);

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
        alert(`Error guardando el registro: ${error.response.data.error}`);
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