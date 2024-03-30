import mongoose from "mongoose";

const pezSchema = new mongoose.Schema({
    usuario:{
        type: String,
        require: true
    },
    tipo:{
        type: String,
        require: true,

    },
    cantidad:{
        type: String,
        require: true
    },
    

})

export default mongoose.model('Pez', pezSchema);