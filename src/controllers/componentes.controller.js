import { createInvernadero } from './invernadero.controller.js';
import { createPez } from './pez.controller.js';

export {createSensor, readSensor, updateSensor, deleteSensor} from './sensor.controller.js';
export {createPez, readPez, updatePez, deletePez} from './pez.controller.js';
export {createInvernadero, readInvernadero, updateInvernadero, deleteInvernadero} from './invernadero.controller.js';
export {estado} from '../db.js'

//este archivo sirve para juntar todos los servicios de back y no importar uno x uno al usarlos

/*    export const Composensores = async(req, res) => {
    const {UsuarioSensor} =
    }*/
function creartodo(user){
    createPez(user)//crear una funcion aparte que mande a llamar la madre del back pa k no batalle despues
    //funcion de coomparativos
    createInvernadero(user)//se seleccionan por pez, cultivo
}