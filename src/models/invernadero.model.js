import mongoose from "mongoose";

const invernaderoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    pez: {
        type: String,
        require: true,
    },
    cultivo: {
        type: String,
        require: true
    },
    capacidad: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
    fechaAlta: {
        type: Date,
        required: true
    },
    fechaBaja: {
        type: Date
    }

})

export default mongoose.model('Invernadero', invernaderoSchema)