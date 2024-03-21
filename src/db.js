import mongoose from "mongoose";
let conexion

export const connectDB = async () => {

    try {
        await mongoose.connect('mongodb://localhost/agro')
        console.log('>>>>> Conectado')
        conexion = 'ok'
        
    } catch (error) {
        console.log(error)     
        conexion = 'notok'   
    }
    const datos = {
        estadoConexion : conexion
    }
    res.send(datos)
}
