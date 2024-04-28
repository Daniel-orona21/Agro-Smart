import Sensor from '../models/sensor.model.js';
import humedadchart from "../models/humedadchart.model.js";
import phchart from "../models/phchart.model.js";
import temperaturachart from "../models/temperaturas.model.js";
import nivelchart from "../models/nivelchart.model.js";
import { newph, newhumedad, newnivel } from './charts.controller.js';

const fechaActual = new Date();

const generarValorAleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generarNivelAleatorio = () => {
  const randomValue = Math.random();
  return randomValue < 0.5 ? 'Lleno' : 'Medio';
};

export const updateSensorfake = async (usuario, res = null) => {
  try {
    const fechaActual = new Date();

    // Actualiza el gráfico de pH
    const phfake = await phchart.findOneAndUpdate(
      { usuario },
      {
        $push: {
          datos: { $each: [generarValorAleatorio(6, 9)], $position: 0 },
          fechaInsercion: { $each: [fechaActual], $position: 0 }
        }
      },
      { upsert: true, new: true }
    );

    // Actualiza el gráfico de humedad
    const humedadfake = await humedadchart.findOneAndUpdate(
      { usuario },
      {
        $push: {
          datos: { $each: [generarValorAleatorio(20, 50)], $position: 0 },
          fechaInsercion: { $each: [fechaActual], $position: 0 }
        }
      },
      { upsert: true, new: true }
    );

    // Actualiza el gráfico de nivel
    const nivelfake = await nivelchart.findOneAndUpdate(
      { usuario },
      {
        $push: {
          datos: { $each: [generarNivelAleatorio()], $position: 0 },
          fechaInsercion: { $each: [fechaActual], $position: 0 }
        }
      },
      { upsert: true, new: true }
    );

    // Actualiza el gráfico de temperatura
    const temperaturafake = await temperaturachart.findOneAndUpdate(
      { usuario },
      {
        $push: {
          datosAgua: { $each: [generarValorAleatorio(20, 50)], $position: 0 },
          datosAmbiente: { $each: [generarValorAleatorio(20, 50)], $position: 0 },
          fechaInsercion: { $each: [fechaActual], $position: 0 }
        }
      },
      { upsert: true, new: true }
    );

    console.log('Actualización de los gráficos realizada con éxito');
    if (res) res.send('Actualización de los gráficos realizada con éxito');
  } catch (error) {
    console.error('Error interno del servidor:', error);
    if (res) res.status(500).send('Error interno del servidor');
  }
};
