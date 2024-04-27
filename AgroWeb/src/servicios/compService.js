import axios from 'axios';
//test
const URL_API="https://agroback.onrender.com/api"


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




export function updatesensor(User){
    return axios.put(URL_API+"/Sensor", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}


export function updatesensorfake(User){
    return axios.put(URL_API+"/Fake", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export const readSensor = (usuario) => {
    return axios.get(`${URL_API}/Sensor/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const readph = (usuario) => {
    return axios.get(`${URL_API}/Ph/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const readnivel = (usuario) => {
    return axios.get(`${URL_API}/Nivel/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const readhumedad = (usuario) => {
    return axios.get(`${URL_API}/Humedad/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const readtemperatura = (usuario) => {
    return axios.get(`${URL_API}/Temperatura/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const getFirstDataFromAllCharts = (usuario) => {
    return axios.get(`${URL_API}/Charts/FirstData/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
};
