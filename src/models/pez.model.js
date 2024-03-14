import mongoose from "mongoose";

const pezSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim:true
    },
    tipo:{
        type: String,
        require: true,
        trim:true,
        unique: true
        
    },
    cantidad:{
        type: String,
        require: true
    },
    

})

export default mongoose.model('Pez', pezSchema);