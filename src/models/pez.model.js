import mongoose from "mongoose";

const pezSchema = new mongoose.Schema({
    cantidad: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        require: true,

    },
    usuario: {
        type: String,
        require: true
    },


})

export default mongoose.model('Pez2', pezSchema);