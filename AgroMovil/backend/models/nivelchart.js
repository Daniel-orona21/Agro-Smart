const mongoose = require('mongoose');

const nivelChartSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    invernadero: String,
    datos:[String],
    fechaInsercion:[Date]
});

const NivelChart = mongoose.model('nivelcharts', nivelChartSchema);

module.exports = NivelChart;
