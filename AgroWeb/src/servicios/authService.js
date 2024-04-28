import axios from './axios';
//test


export function addUser(User){
    return axios.post("/register", User,{
      withCredentials: true,
    })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export function loginUser(User){
    return axios.post("/login", User,  {
      withCredentials: true,
    })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
        });
}

export function profile (){
  return axios.get("/profile",  {
    withCredentials: true,
  })
      .catch(error => {
          console.error('Error al enviar la solicitud:', error);
          throw error; // Lanzar el error para que pueda ser manejado en otro lugar si es necesario
      });
      
}

export const verifyTokenRequest = async () => axios.get(`/verify`);

// export const profile = async (token) => {
//     try {
//       const res = await axios.get(`${URL_API}/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}` // Adjuntar el token en el encabezado Authorization
//         }
//       });
//       //return res.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
