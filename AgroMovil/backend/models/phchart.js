const mongoose = require('mongoose');

const phChartSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    invernadero: String,
    datos:[Number],
    fechaInsercion:[Date]
});

const PhChart = mongoose.model('phcharts', phChartSchema);

module.exports = PhChart;
