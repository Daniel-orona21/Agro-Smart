const mongoose = require('mongoose');

const humedadChartSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    invernadero: String,
    datos:[Number],
    fechaInsercion:[Date]
});

const HumedadChart = mongoose.model('humedadcharts', humedadChartSchema);

module.exports = HumedadChart;
