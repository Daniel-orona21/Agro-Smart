export {sensor, createSensor, readSensor, updateSensor, deleteSensor} from './sensor.controller.js'
export {Pez, createPez, readPez, updatePez, deletePez} from './pez.controller.js'
export {Invernadero, createInvernadero, readInvernadero, updateInvernadero, deleteInvernadero} from './invernadero.controller.js'
import datos from '../db.js'

//este archivo sirve para juntar todos los servicios de back y no importar uno x uno al usarlos

/*    export const Composensores = async(req, res) => {
    const {UsuarioSensor} =
    }*/
