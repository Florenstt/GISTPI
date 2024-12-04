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
  port: 5433, // Asegúrate de que coincida con el puerto de tu configuración de Docker
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
        nombre, tipo, situación, precisión, escala, signo, fuente, operador, dataset, fclass, responsabl, cargo, progreso, t_act, coord, sp, datum, ac, administra, actualizac, cell_name, igds_type, igds_weigh, rotation, igds_color, "group", igds_level, geom
      ) VALUES (
        $1, 'Producción', 'Activa', 'Alta precisión', '1:50000', 92007, 'IGN', 'Pérez', 'Recursos Naturales', 'Agrícola', 'Juan López', 'Gerente', 'En progreso', '2024-12-03', NULL, 'POSGAR94', 'WGS84', 1, 'Gobierno Provincial', '2024-12-03', 'Ninguno', NULL, 0, 0, 0, 0, 0, ST_SetSRID(ST_Multi(ST_MakePoint($2, $3)), 4326)
      ) RETURNING *`,
      [name, coordinates[0], coordinates[1]]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error guardando el nombre y las coordenadas:', error);
    res.status(500).json({ error: 'Error guardando el nombre y las coordenadas' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});