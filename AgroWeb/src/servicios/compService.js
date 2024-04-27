import axios from './axios';
//test




export function addpez(User){
    return axios.post("/Pez", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export function addinvernadero(User){
    return axios.post("/Invernadero", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export function addsensor(User){
    return axios.post("/Sensor", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}




export function updatesensor(User){
    return axios.put("/Sensor", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}


export function updatesensorfake(User){
    return axios.put("/Fake", User)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export const readSensor = (usuario) => {
    return axios.get(`/Sensor/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const readph = (usuario) => {
    return axios.get(`/Ph/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const readnivel = (usuario) => {
    return axios.get(`/Nivel/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const readhumedad = (usuario) => {
    return axios.get(`/Humedad/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const readtemperatura = (usuario) => {
    return axios.get(`/Temperatura/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const getFirstDataFromAllCharts = (usuario) => {
    return axios.get(`/Charts/FirstData/${usuario}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
};
