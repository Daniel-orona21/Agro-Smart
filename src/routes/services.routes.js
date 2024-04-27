import { Router } from "express";

import {createSensor, readSensor, updateSensor, deleteSensor} from '../controllers/sensor.controller.js'
import {createPez, readPez, updatePez, deletePez} from '../controllers/pez.controller.js'
import {createInvernadero, readInvernadero, updateInvernadero, deleteInvernadero} from '../controllers/invernadero.controller.js'
import { createphdata,createniveldata,createhumedaddata,newph, newnivel, newhumedad, readph, readnivel, readhumedad, readtemperatura, createtemperaturadata, newtemperatura, getFirstDataFromAllCharts } from "../controllers/charts.controller.js";
import {phfechas} from '../controllers/charts.controller.js'
import { updateSensorfake } from "../controllers/componentes.controller.js";
const router = Router();

router.post('/Sensor',createSensor);
router.get('/Sensor/:usuario',readSensor);
router.put('/Sensor',updateSensor); 
router.patch('/Sensor',deleteSensor);

router.post('/Pez',createPez);
router.get('/Pez',readPez);
router.put('/Pez',updatePez); 
router.patch('/Pez',deletePez);

router.post('/Invernadero',createInvernadero);
router.get('/Invernadero',readInvernadero);
router.put('/Invernadero',updateInvernadero); 
router.patch('/Invernadero',deleteInvernadero);

router.patch('/Fake',updateSensorfake);
//graficas
router.post('/Ph',createphdata);
router.post('/Nivel',createniveldata);
router.post('/Humedad',createhumedaddata);
router.post('/Temperatura',createtemperaturadata);


router.patch('/Ph',newph)
router.patch('/Nivel',newnivel)
router.patch('/Humedad',newhumedad)
router.patch('/Temperatura',newtemperatura)


router.get('/Ph/:usuario',readph);
router.get('/Nivel/:usuario',readnivel);
router.get('/Humedad/:usuario',readhumedad);
router.get('/Temperatura/:usuario',readtemperatura);

router.get('/Ph/:usuario/:fechaInicio/:fechaFinal', phfechas);
router.get('/Charts/FirstData/:usuario', getFirstDataFromAllCharts);


export default router
