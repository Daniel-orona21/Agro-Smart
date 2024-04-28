import mongoose from "mongoose";

const temperaturaChartSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    invernadero: {
        type: String,

    },
    datosAgua: [Number],
    datosAmbiente: [Number],
    fechaInsercion: [Date]


});

export default mongoose.model('temperaturachart', temperaturaChartSchema);