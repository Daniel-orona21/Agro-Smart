//Aqui se crea el token

import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'; //esta es la palabra con la que se junta con los datos o algo asi


export function createAccessToken(payload){

    return new Promise((resolve,reject) => {
        //el payload son los datos que recibe de autcontroller y lo pone en el token
        jwt.sign(
            payload,
         TOKEN_SECRET, {
            expiresIn: "1d"
        },
        (err, token)=>{
            if (err) reject(err)
            resolve(token)
            
        }
        )
    }
    )

    
}

