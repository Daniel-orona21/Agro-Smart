import axios from 'axios';
//test
const URL_API="http://localhost:3000/api"

export function addUser(User){
    return axios.post(URL_API+"/register", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export function loginUser(User){
    return axios.post(URL_API+"/login", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}
