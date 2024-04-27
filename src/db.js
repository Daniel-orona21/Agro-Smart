import mongoose from "mongoose";
let conexion

export const connectDB = async () => {

    try {
        await mongoose.connect('mongodb+srv://AgroSmart:Agro123456789@cluster0.jgsyops.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('>>>>> Conectado')
        conexion = 'ok'
        
    } catch (error) {
        console.log(error)     
        conexion = 'notok'   
    }
   

}
export const estado = async () =>{
     const estado = {
        estadoConexion : conexion
    }
    res.send(estado)
}