const mongoose = require('mongoose');

const temperaturaChartSchema = new mongoose.Schema({
    usuario:{
        type:String,
        required:true,
        unique:true
    },
    invernadero:{
        type:String,
        
    },
    datosAgua:[Number],
    datosAmbiente:[Number],
    fechaInsercion:[Date],
        
   
});

const TemperaturaChart = mongoose.model('temperaturacharts', temperaturaChartSchema);

module.exports = TemperaturaChart;