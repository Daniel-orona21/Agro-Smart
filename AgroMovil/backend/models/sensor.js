const mongoose = require('mongoose');

// Define el esquema para los sensores
const sensorSchema = new mongoose.Schema({
  humedadAmbiente: Number,
  nivel: String,
  ph: Number,
  temperaturaAmbiente: Number,
  temperaturaEstanque: Number
});

// Crea el modelo 'Sensor' basado en el esquema definido
const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
