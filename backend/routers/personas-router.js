var express = require('express');
var router = express.Router();

module.exports = function (db) {
    // Obtener Personas
    router.get('/lista', async (req, res) => {
        try {
            const results = await db.query('SELECT * FROM persona');
            res.send(results);
        } catch (error) {
            res.status(500).send('Error al realizar la consulta');
        }
    });

    // Actualizar Personas
    router.put('/detalles/:idPer', async (req, res) => {
        const {nombres, apellidos, fecha_de_nacimiento, tipo_documento, numero_documento, estado} = req.body;
        const idPer = req.params.idPer;
        try {
          await db.query(
            'UPDATE persona SET nombres=?, apellidos=?, fecha_de_nacimiento=?, tipo_documento=?, numero_documento=?, estado=? WHERE idPer=?',
            [nombres, apellidos, fecha_de_nacimiento, tipo_documento, numero_documento, estado, idPer]);
          res.send({ message: 'Registro actualizado correctamente' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al actualizar el registro');
        }
      });

     // Guardar Personas
    router.post('/lista', async (req, res) => {
      const {nombres, apellidos, fecha_de_nacimiento, tipo_documento, numero_documento, estado} = req.body;
      const query = 'INSERT INTO persona (nombres, apellidos, fecha_de_nacimiento, tipo_documento, numero_documento, estado) VALUES (?, ?, ?, ?, ?, ?)';
      try {
          await db.query(query, [nombres, apellidos, fecha_de_nacimiento, tipo_documento, numero_documento, estado]);
          res.status(201).json({ message: 'Registro guardado exitosamente'});
      } catch (error) {
          res.status(500).json({ error: 'Error al realizar la inserción' });
      }
    });

     // Eliminar Personas
     router.delete('/detalles/:idPer', async (req, res) => {
      const idPer = req.params.idPer;
      try {
          await db.query(
          'DELETE FROM persona WHERE idPer=?',
          [idPer]);
          res.send({ message: 'Registro eliminado correctamente' });
      } catch (error) {
          res.status(500).send('Error al eliminaar el registro');
      }
    });

  return router;
};
