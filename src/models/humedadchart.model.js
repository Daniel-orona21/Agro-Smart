import mongoose from "mongoose";

const humedadChartSchema = new mongoose.Schema({
    usuario:{
        type:String,
        required:true,
        unique:true,
    },
    invernadero:{
        type:String,
        
    },
    datos:[Number],
    fechaInsercion:[Date]
        
   
});

export default mongoose.model('humedadchart',humedadChartSchema);