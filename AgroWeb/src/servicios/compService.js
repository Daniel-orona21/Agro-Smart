import axios from 'axios';
//test
const URL_API="http://localhost:3000/api"


export function addpez(User){
    return axios.post(URL_API+"/Pez", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export function addinvernadero(User){
    return axios.post(URL_API+"/Invernadero", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export function addsensor(User){
    return axios.post(URL_API+"/Sensor", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}