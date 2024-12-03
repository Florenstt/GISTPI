// servers.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001; // Puedes cambiar el puerto si es necesario

// Configuración de la base de datos
const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'sigdb',
  password: 'mypassword',
  port: 5432, // Asegúrate de que coincida con el puerto de tu configuración de Docker
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Habilitar CORS para todas las rutas

// Ruta para guardar el nombre y las coordenadas en la base de datos
app.post('/api/actividades_agropecuarias', async (req, res) => {
  const { name, coordinates } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO actividades_agropecuarias (
        nombre, geom
      ) VALUES (
        $1, ST_Transform(ST_SetSRID(ST_Multi(ST_MakePoint($2, $3)), 4326), 26918)
      ) RETURNING *`,
      [name, coordinates[0], coordinates[1]]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error guardando el nombre y las coordenadas:', error);
    res.status(500).json({ error: 'Error guardando el nombre y las coordenadas', details: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});