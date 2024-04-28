import mongoose from "mongoose";

const nivelChartSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        uniquie: true
    },
    invernadero: {
        type: String,

    },
    datos: [String],
    fechaInsercion: [Date]


});

export default mongoose.model('nivelchart', nivelChartSchema);