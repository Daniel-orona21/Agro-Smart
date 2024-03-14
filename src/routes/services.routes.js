import { Router } from "express";

import {sensor, createSensor, readSensor, updateSensor, deleteSensor} from '../controllers/sensor.controller.js'
import {Pez, createPez, readPez, updatePez, deletePez} from '../controllers/pez.controller.js'
import {Invernadero, createInvernadero, readInvernadero, updateInvernadero, deleteInvernadero} from '../controllers/invernadero.controller.js'

router.post('/Sensor',createSensor);
router.get('/Sensor',readSensor);
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

export default router
