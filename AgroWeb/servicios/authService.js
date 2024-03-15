import axios from 'axios';

const URL_API="http://localhost:3000/api"
export function register(User){
    return axios.post(`${URL_API}/register`, User)
}